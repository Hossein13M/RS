import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MinioEnv } from 'app/services/API/api-configuration';
import { FindFlowInstanceResponseDto, GetFlowHistoryDto, GetFlowNoteDto, GetFlowWizardResponseDto } from 'app/services/API/models';
import {
    FlowFileService,



    FlowHistoryService, FlowInstanceDataService,
    FlowNoteService, FlowWizardService
} from 'app/services/API/services';
import * as Minio from 'assets/js/minio-browser/minio-browser.js';
import { SnotifyService } from 'ng-snotify';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class FlowsWizardService {
    private _flowInstance: BehaviorSubject<FindFlowInstanceResponseDto> = new BehaviorSubject({} as FindFlowInstanceResponseDto);
    public flowInstanceStatus: BehaviorSubject<GetFlowWizardResponseDto> = new BehaviorSubject({} as GetFlowWizardResponseDto);
    public flowInstanceNote: BehaviorSubject<Array<GetFlowNoteDto>> = new BehaviorSubject([]);
    public flowInstanceHistory: BehaviorSubject<Array<GetFlowHistoryDto>> = new BehaviorSubject([]);

    public finalCode: BehaviorSubject<string> = new BehaviorSubject('');

    private readonly flowInstanceBucket = 'flow-instances';

    public downloadUrl: BehaviorSubject<string> = new BehaviorSubject('');

    private readonly minioClient = new Minio.Client({
        endPoint: MinioEnv.MINIO_ENDPOINT,
        port: +MinioEnv.MINIO_PORT,
        useSSL: false,
        accessKey: MinioEnv.MINIO_ACCESS_KEY,
        secretKey: MinioEnv.MINIO_SECRET_KEY,
    });

    constructor(
        private flowFileService: FlowFileService,
        private flowWizardService: FlowWizardService,
        private flowNoteService: FlowNoteService,
        private snotifyService: SnotifyService,
        private snackBar: MatSnackBar,
        private flowHistoryService: FlowHistoryService,
        private flowInstanceDataService: FlowInstanceDataService,
        private http: HttpClient
    ) {}

    set flowInstance(flowInstance: FindFlowInstanceResponseDto) {
        this._flowInstance.next(flowInstance);
        if (flowInstance.code.search('draft') != -1) {
            this.finalCode.next(flowInstance.code);
        }
    }

    /*
     * flow wizard
     */

    downloadFile(flowInstanceId: string): Observable<void> {
        return this.flowFileService.flowFileControllerDownloadFile({ entityId: flowInstanceId }).pipe(
            map((res) => {
                this.downloadUrl.next(res.presignedUrl);
            })
        );
    }

    getFlowWizardData(flowId: string, flowInstanceId: string): Observable<GetFlowWizardResponseDto> {
        const param = {
            flowId: flowId,
            flowInstanceId: flowInstanceId,
        };
        this.getNotes(flowInstanceId).subscribe(() => {});
        this.downloadFile(flowInstanceId).subscribe(() => {});
        return this.flowWizardService.flowWizardControllerGetFlowWizard(param).pipe(
            map((res) => {
                this.flowInstanceStatus.next(res);
                return res;
            }),
            finalize(() => {
                this.getHistory(flowInstanceId).subscribe(() => {});
            })
        );
    }

    confirm(flowId: string, flowInstanceId: string): Observable<GetFlowWizardResponseDto> {
        const param = {
            body: {
                flowId: flowId,
                flowInstanceId: flowInstanceId,
            },
        };

        return this.flowWizardService.flowWizardControllerConfirmFlowWizard(param).pipe(
            map((res) => {
                this.flowInstanceStatus.next(res);
                return res;
            }),
            finalize(() => {
                this.getHistory(flowInstanceId).subscribe(() => {});
            })
        );
    }

    reject(flowId: string, flowInstanceId: string, pauseReason: string): Observable<any> {
        const param = {
            body: {
                flowId: flowId,
                flowInstanceId: flowInstanceId,
                pauseReason: pauseReason,
            },
        };

        return this.flowWizardService.flowWizardControllerRejectFlowWizard(param).pipe(
            map((res) => {
                this.flowInstanceStatus.next(res);
                return res;
            }),
            finalize(() => {
                this.getHistory(flowInstanceId).subscribe(() => {});
                this.getNotes(flowInstanceId).subscribe(() => {});
            })
        );
    }

    pause(flowId: string, flowInstanceId: string, pauseReason: string): Observable<GetFlowWizardResponseDto> {
        const param = {
            body: {
                flowId: flowId,
                flowInstanceId: flowInstanceId,
                pauseReason: pauseReason,
            },
        };
        return this.flowWizardService.flowWizardControllerPauseFlowWizard(param).pipe(
            map((res) => {
                this.flowInstanceStatus.next(res);
                return res;
            }),
            finalize(() => {
                this.getHistory(flowInstanceId).subscribe(() => {});
                this.getNotes(flowInstanceId).subscribe(() => {});
            })
        );
    }

    reopen(flowId: string, flowInstanceId: string): Observable<GetFlowWizardResponseDto> {
        const param = {
            body: {
                flowId: flowId,
                flowInstanceId: flowInstanceId,
            },
        };
        return this.flowWizardService.flowWizardControllerReopenFlowWizard(param).pipe(
            map((res) => {
                this.flowInstanceStatus.next(res);
                return res;
            }),
            finalize(() => {
                this.getHistory(flowInstanceId).subscribe(() => {});
            })
        );
    }

    generateFinalCode(flowId: string, flowInstanceId: string): Observable<any> {
        if (this.finalCode.getValue() != '') {
            return;
        }
        const param = {
            body: {
                flowId: flowId,
                flowInstanceId: flowInstanceId,
            },
        };
        return this.flowWizardService.flowWizardControllerGenerateContractFinalCode(param).pipe(
            map((res) => {
                this.finalCode.next(res.code);
                return res;
            }),
            finalize(() => {
                this.getHistory(flowInstanceId).subscribe(() => {});
            })
        );
    }

    /*
     * end flow wizard
     */

    /*
     * flow note
     */
    addNote(flowInstanceId: string, text: string): Observable<any> {
        const param = {
            body: {
                text: text,
                flowInstanceId: flowInstanceId,
            },
        };
        return this.flowNoteService.flowNoteControllerCreateFlowNote(param).pipe(
            map((res) => {
                let flowInstanceNote = this.flowInstanceNote.getValue();
                flowInstanceNote.push(res);
                this.flowInstanceNote.next(flowInstanceNote);
            })
        );
    }

    getNotes(flowInstanceId: string): Observable<Array<GetFlowNoteDto>> {
        const param = {
            flowInstanceId: flowInstanceId,
        };
        return this.flowNoteService.flowNoteControllerGetFlowNote(param).pipe(
            map((res) => {
                this.flowInstanceNote.next(res);
                return res;
            })
        );
    }

    /*
     *  end flow note
     */

    /*
     * flow history
     */
    getHistory(flowInstanceId: string): Observable<Array<GetFlowHistoryDto>> {
        const param = {
            flowInstanceId: flowInstanceId,
        };
        return this.flowHistoryService.flowHistoryControllerGetFlow(param).pipe(
            map((res) => {
                this.flowInstanceHistory.next(res);
                return res;
            })
        );
    }

    /*
     * end flow history
     */

    /*
     *  start upload
     */
    async uploadFile(flowInstanceId: string, file) {
        return await this.minioClient.bucketExists(this.flowInstanceBucket).then(async (bucketExists) => {
            if (!bucketExists) {
                await this.minioClient.makeBucket(this.flowInstanceBucket).catch((error) => {
                    throw error;
                });
            }
            this.flowFileService
                .flowFileControllerGetObjectName({
                    entityId: flowInstanceId,
                    fileName: file['name'],
                })
                .subscribe(async (objectName) => {
                    return await this.minioClient
                        .presignedPutObject(
                            this.flowInstanceBucket,
                            objectName.objectName,
                            +MinioEnv.MINIO_PRESIGNED_URL_EXPIRY // 1 hour
                        )
                        .then((presignedUrl) => {
                            let headers = new HttpHeaders({
                                'Content-Type': 'multipart/form-data',
                            });

                            const formData: FormData = new FormData();
                            formData.append('file', file, objectName.objectName);

                            this.http.put(presignedUrl, formData, { headers: headers }).subscribe((res) => {
                                // this.snotifyService.success("با موفقیت اپلود شد");
                                this.snackBar.open('با موفقیت اپلود شد', '', {
                                    panelClass: 'snack-success',
                                    direction: 'rtl',
                                    duration: 3000,
                                });
                                this.downloadFile(flowInstanceId).subscribe(() => {});
                            });
                        });
                });
        });
    }

    /*
     *  end upload
     */
}
