export default {
    state: {
        m_brend: {
            rows: [],
            columns: [],
            col: []
        },

    },
    actions: {
        async fetchBrend(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/PosBrends');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateBrend', res_data);
        },
        async fetchBrend_column(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_brend&auth_id=' + id);
            const res_data = await res.json();
            ctx.commit('updateBrend_column', res_data);
        },
    },
    mutations: {
        updateBrend(state, data) {
            console.log(data)
            state.m_brend.rows = data;
        },
        brend_delete_row(state, index) {
            state.m_brend.rows.splice(parseInt(index), 1);
        },
        updateBrend_column(state, data) {
            state.m_brend.col = data;
            console.log(data)
                //status true bolgan ustun nomlarini olish uchun
            state.m_brend.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },

    },
    getters: {
        allBrend(state) {
            return state.m_brend;
        }

    }
}