import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '59e9ea47f4d44bad90c29c6b32f8126f'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '80ada79a20484095a0cd9aded81bab7d'
                    }
                    'risk-assessment.css': {
                        table: 'sys_ux_theme_asset'
                        id: 'dffeb3ede60441d3828dbeeab3c48220'
                    }
                }
                composite: [
                    {
                        table: 'sys_ux_lib_asset'
                        id: '1986c43f07574c839678936bf9fe1596'
                        key: {
                            name: 'x_trwi_trustwise_0/main.js.map'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '6a0416169d9942518d2247064218a4ca'
                        key: {
                            name: 'x_trwi_trustwise_0/popup-main.js.map'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '9486b40d0026491583e8ef66a2a171a2'
                        key: {
                            endpoint: 'x_trwi_trustwise_0_popup_callback.do'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'b006db40b8704c3b94dcc31d7cbfcbd8'
                        key: {
                            name: 'x_trwi_trustwise_0/main'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'ed5877d237a844239dd2fefc75b44fa2'
                        key: {
                            name: 'x_trwi_trustwise_0/popup-main'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'f9425b747f31492a9f3b5d2cc3818ac7'
                        key: {
                            endpoint: 'x_trwi_trustwise_0_risk_assessment.do'
                        }
                    },
                ]
            }
        }
    }
}
