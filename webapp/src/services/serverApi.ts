import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import Cookies from 'js-cookie';

import Constants from 'pluginConstants';
import Utils from 'utils';

// Service to make plugin API requests
export const mattermostServerApi = createApi({
    reducerPath: 'mattermostServerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: Utils.getBaseUrls().mattermostApiBaseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get(Constants.common.MMAUTHTOKEN);

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        [Constants.mattermostApiServiceConfigs.getChannels.apiServiceName]: builder.query<ChannelList[], FetchChannelParams>({
            query: (params) => {
                const currentUserId = Cookies.get(Constants.common.MMUSERID) ?? '';
                return ({
                    headers: {[Constants.common.HeaderCSRFToken]: Cookies.get(Constants.common.MMCSRF)},
                    url: Constants.mattermostApiServiceConfigs.getChannels.path([currentUserId, params.teamId]),
                    method: Constants.mattermostApiServiceConfigs.getChannels.method,
                });
            },
        }),
    }),
});
