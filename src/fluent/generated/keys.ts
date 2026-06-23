import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: 'f233ee1578804a67b3992610518e7a52'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '44d802bb5e9646aeba35d4aa0839c56e'
                    }
                }
                composite: [
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '049faf29409d421bb95b9726d7a0ab7a'
                        key: {
                            application_file: '0e58537c42604b5c99974d30e1b34242'
                            source_artifact: '9f8ce14a98e14ee79cfa6c2d1dd19615'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '0e58537c42604b5c99974d30e1b34242'
                        key: {
                            name: 'x_2058331_risk/vendor-react-dom--966e429a'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '260ea1385b6d4ce6a01148ab304f8841'
                        key: {
                            name: 'x_2058331_risk/vendor-react-dom--966e429a.js.map'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '3960c33dd32840adb788148575e426d0'
                        key: {
                            endpoint: 'x_2058331_risk_incident_manager.do'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '7558a59931ea47a59ca9b6dba5567038'
                        key: {
                            application_file: '260ea1385b6d4ce6a01148ab304f8841'
                            source_artifact: '9f8ce14a98e14ee79cfa6c2d1dd19615'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '83f08f7d29754487a3043e7f4dc6a407'
                        key: {
                            name: 'x_2058331_risk/main'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: '9f8ce14a98e14ee79cfa6c2d1dd19615'
                        key: {
                            name: 'x_2058331_risk_incident_manager.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'bad5e988a0e54e6b96ab82bb98f6a464'
                        key: {
                            application_file: '3960c33dd32840adb788148575e426d0'
                            source_artifact: '9f8ce14a98e14ee79cfa6c2d1dd19615'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'ede077aace664ae687c44d7e6708dea4'
                        key: {
                            application_file: 'eecd9353f2dd4036ad542fbc54517871'
                            source_artifact: '9f8ce14a98e14ee79cfa6c2d1dd19615'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'eecd9353f2dd4036ad542fbc54517871'
                        key: {
                            name: 'x_2058331_risk/main.js.map'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'f42d7067f638466d8672ff1127154cd1'
                        key: {
                            application_file: '83f08f7d29754487a3043e7f4dc6a407'
                            source_artifact: '9f8ce14a98e14ee79cfa6c2d1dd19615'
                        }
                    },
                ]
            }
        }
    }
}
