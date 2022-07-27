export default {
    state: {
        m_department: {
            rows: [],
            columns: [],
            col: []
        },

    },
    actions: {
        async fetchDepartment(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/PosDepartments');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateDepartment', res_data);
        },
        async fetchDepartment_column(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_department&auth_id=' + id);
            const res_data = await res.json();
            ctx.commit('updateDepartment_column', res_data);
        },
    },
    mutations: {
        updateDepartment(state, data) {
            console.log(data)
            state.m_department.rows = data;
        },
        department_delete_row(state, index) {
            state.m_department.rows.splice(parseInt(index), 1);
        },
        updateDepartment_column(state, data) {
            state.m_department.col = data;
            console.log(data)
                //status true bolgan ustun nomlarini olish uchun
            state.m_department.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },

    },
    getters: {
        allDepartment(state) {
            return state.m_department;
        }

    }
}