import { tap } from 'rxjs/operators';
import { StateType } from '../state-type.enum';

export function StateManager(data: { state: string; data?: any }): any {
    data.state = StateType.LOADING;
    return tap(
        () => (data.state = StateType.PRESENT),
        () => {
            data.state = StateType.FAIL;
            setTimeout(() => (data.state = StateType.PRESENT), 500);
        }
    );
}
