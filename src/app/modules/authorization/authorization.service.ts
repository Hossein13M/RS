import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangePassword, Login, LoginResponse, Organization, User } from './auth.model';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { ResponseWithPagination } from '#shared/models/pagination.model';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable()
export class AuthorizationService {
    constructor(private http: HttpClient) {}

    public login(loginInfo: Login): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`/api/v2/auth/login`, loginInfo);
    }

    public changePassword(model: ChangePassword): Observable<null> {
        return this.http.put<null>(`/api/v2/user/unauthorized/change-password`, model);
    }

    public getOrganizations(codes: Array<number>): Observable<ResponseWithPagination<Organization>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ limit: 1000, skip: 0, codes });
        return this.http.get<ResponseWithPagination<Organization>>(`/api/v1/organization`, { params });
    }

    public decodeToken(token?: LoginResponse): User {
        // Todo fix RBACK
        // const specialRoleForMohammadAliHosseini = 'assetsMonitoring';
        // const role =
        //     'assets|nav|yield_curve|assets_return|risk_measuring|marketRisk|complianceFund|complianceCalc|fundCompliance|compliance|tree|grid|changes|glBrief|financialModel|wfe|contractDashboard|operator|baseData|userDetail|userInput|branch|broker|gl|deposit|bank|bourse-board|bourse-market|instrument|fundRole|supervisor|organizationType|instrumentType|fund|market|settings|user|dashboards|opRiskTreeChart|opRiskFlow|OpRiskManagement|OpRiskReporting|OpRiskReporting|opRisk|portfolio-management|trade-book-dashboard|trade-book|complianceCalc|marketRisk|trade-add|assetsMonitoring|organizations|organizationsList|rolesList|contract|organizations|organizationsList|rolesList';
        let role =
            'assets|nav|yield_curve|assets_return|risk_measuring|marketRisk|complianceFund|complianceCalc|fundCompliance|compliance|tree|grid|changes|glBrief|financialModel|wfe|contractDashboard|operator|baseData|userDetail|userInput|branch|broker|gl|deposit|bank|bourse-board|bourse-market|instrument|fundRole|supervisor|organizationType|instrumentType|fund|market|settings|user|dashboards|opRiskTreeChart|opRiskFlow|OpRiskManagement|OpRiskReporting|OpRiskReporting|opRisk|portfolio-management|trade-book-dashboard|trade-book|complianceCalc|marketRisk|trade-add|assetsMonitoring|organizations|organizationsList|rolesList|contract|organizations|organizationsList|rolesList';
        if (token) {
            const specialUser: User = jwtDecode(token.accessToken);
            if (specialUser.userId === 70) {
                role = 'assets';
                return {
                    role,
                    ...jwtDecode(token.accessToken),
                } as User;
            } else {
                role =
                    'assets|nav|yield_curve|assets_return|risk_measuring|marketRisk|complianceFund|complianceCalc|fundCompliance|compliance|tree|grid|changes|glBrief|financialModel|wfe|contractDashboard|operator|baseData|userDetail|userInput|branch|broker|gl|deposit|bank|bourse-board|bourse-market|instrument|fundRole|supervisor|organizationType|instrumentType|fund|market|settings|user|dashboards|opRiskTreeChart|opRiskFlow|OpRiskManagement|OpRiskReporting|OpRiskReporting|opRisk|portfolio-management|trade-book-dashboard|trade-book|complianceCalc|marketRisk|trade-add|assetsMonitoring|organizations|organizationsList|rolesList|contract|organizations|organizationsList|rolesList';
                return {
                    role,
                    ...jwtDecode(token.accessToken),
                } as User;
            }
        } else {
            return {
                role,
                ...jwtDecode(localStorage.getItem('accessToken')),
            } as User;
        }
    }
}
