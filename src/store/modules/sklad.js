export default {
    state: {
        m_sklad: {
            rows: [],
            columns: [],
            col: []
        },

    },
    actions: {
        async fetchSklad(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/PosSklads');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateSklad', res_data);
        },
        async fetchSklad_column(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_sklad&auth_id=' + id);
            const res_data = await res.json();
            ctx.commit('updateSklad_column', res_data);
        },
    },
    mutations: {
        updateSklad(state, data) {
            console.log(data)
            state.m_sklad.rows = data;
        },
        sklad_delete_row(state, index) {
            state.m_sklad.rows.splice(parseInt(index), 1);
        },
        updateSklad_column(state, data) {
            state.m_sklad.col = data;
            console.log(data)
                //status true bolgan ustun nomlarini olish uchun
            state.m_sklad.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },

    },
    getters: {
        allSklad(state) {
            return state.m_sklad;
        }

    }
}