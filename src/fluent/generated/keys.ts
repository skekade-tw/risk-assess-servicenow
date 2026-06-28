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
                    'risk-assessment.css': {
                        table: 'sys_ux_theme_asset'
                        id: '7bae2dd81211453c99d87c8991fa2f13'
                    }
                }
                composite: [
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '0450aab431584411820c13b4d213ba45'
                        deleted: true
                        key: {
                            application_file: '310e7da9255e497ea0caafa27a71f3cf'
                            source_artifact: 'e1f691eb2221435d8ab8842498328ffa'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '049faf29409d421bb95b9726d7a0ab7a'
                        deleted: true
                        key: {
                            application_file: '0e58537c42604b5c99974d30e1b34242'
                            source_artifact: '9f8ce14a98e14ee79cfa6c2d1dd19615'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '0e58537c42604b5c99974d30e1b34242'
                        deleted: true
                        key: {
                            name: 'x_2058331_risk/vendor-react-dom--966e429a'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '260ea1385b6d4ce6a01148ab304f8841'
                        deleted: true
                        key: {
                            name: 'x_2058331_risk/vendor-react-dom--966e429a.js.map'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '2f2bfa156b5548b09196a181bd11f3f4'
                        key: {
                            name: 'x_2058331_risk/popup-main'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '310e7da9255e497ea0caafa27a71f3cf'
                        key: {
                            name: 'x_2058331_risk/popup-main.js.map'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '33982bf906304580896d5da56de318d7'
                        deleted: true
                        key: {
                            application_file: '83f08f7d29754487a3043e7f4dc6a407'
                            source_artifact: 'af7dcb50a3994c5eada3d268b4d0f436'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '341fd7a0f3a146f586b02026edc12c8f'
                        deleted: true
                        key: {
                            application_file: 'eecd9353f2dd4036ad542fbc54517871'
                            source_artifact: 'af7dcb50a3994c5eada3d268b4d0f436'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '3960c33dd32840adb788148575e426d0'
                        deleted: true
                        key: {
                            endpoint: 'x_2058331_risk_incident_manager.do'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '7558a59931ea47a59ca9b6dba5567038'
                        deleted: true
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
                        table: 'sys_ui_page'
                        id: '93739ce1439a4df7ae6e2ab1fa10bd06'
                        key: {
                            endpoint: 'x_2058331_risk_risk_assessment.do'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: '9f8ce14a98e14ee79cfa6c2d1dd19615'
                        deleted: true
                        key: {
                            name: 'x_2058331_risk_incident_manager.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'a2266c0426b44810b9057efa9bb8a5a1'
                        key: {
                            endpoint: 'x_2058331_risk_popup_callback.do'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: 'af7dcb50a3994c5eada3d268b4d0f436'
                        deleted: true
                        key: {
                            name: 'x_2058331_risk_risk_assessment.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'afa3ffee64544b91a58931ee9dd8c631'
                        deleted: true
                        key: {
                            application_file: '2f2bfa156b5548b09196a181bd11f3f4'
                            source_artifact: 'e1f691eb2221435d8ab8842498328ffa'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'bad5e988a0e54e6b96ab82bb98f6a464'
                        deleted: true
                        key: {
                            application_file: '3960c33dd32840adb788148575e426d0'
                            source_artifact: '9f8ce14a98e14ee79cfa6c2d1dd19615'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'c8a8c177cb1d4d60936b1ab899400120'
                        deleted: true
                        key: {
                            application_file: '93739ce1439a4df7ae6e2ab1fa10bd06'
                            source_artifact: 'af7dcb50a3994c5eada3d268b4d0f436'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: 'e1f691eb2221435d8ab8842498328ffa'
                        deleted: true
                        key: {
                            name: 'x_2058331_risk_popup_callback.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'ede077aace664ae687c44d7e6708dea4'
                        deleted: true
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
                        deleted: true
                        key: {
                            application_file: '83f08f7d29754487a3043e7f4dc6a407'
                            source_artifact: '9f8ce14a98e14ee79cfa6c2d1dd19615'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'f825595e01fd48fa88dcad1e4f836646'
                        deleted: true
                        key: {
                            application_file: 'a2266c0426b44810b9057efa9bb8a5a1'
                            source_artifact: 'e1f691eb2221435d8ab8842498328ffa'
                        }
                    },
                ]
            }
        }
    }
}
