import { fetchApps } from '../services/api';

export const fetchAppsAction = (value) => {
    return async dispatch => {
        let { err, data } = await fetchApps();
        if (!err) {
            dispatch({
                type: 'onFetchApps',
                value: data
            });
        }
    };
}
