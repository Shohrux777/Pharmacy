export default {
    state: {
        m_user: {
            rows: [],
            columns: [],
            col: []
        },
        auth_list: [],

    },
    actions: {
        async fetchUser(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/PosUsers');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateUser', res_data);
        },
        async fetchUser_column(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_user&auth_id=' + id);
            const res_data = await res.json();
            ctx.commit('updateUser_column', res_data);
        },
        async fetch_auth_list(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/PosAuthorizations');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateAuth_list', res_data);
        },
    },
    mutations: {
        updateUser(state, data) {
            console.log(data)
            state.m_user.rows = data;
        },
        user_delete_row(state, index) {
            state.m_user.rows.splice(parseInt(index), 1);
        },
        updateUser_column(state, data) {
            state.m_user.col = data;
            console.log(data)
                //status true bolgan ustun nomlarini olish uchun
            state.m_user.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },

        updateAuth_list(state, data) {
            console.log(data)
            state.auth_list = data;
        },

    },
    getters: {
        allUser(state) {
            return state.m_user;
        },
        auth_user_list(state) {
            return state.auth_list;
        }

    }
}