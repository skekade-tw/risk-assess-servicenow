import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import riskAssessmentPage from '../../client/index.html'

UiPage({
    $id: Now.ID['risk-assessment-page'],
    endpoint: 'x_2058331_risk_risk_assessment.do',
    description: 'Trustwise Risk Assessment',
    category: 'general',
    html: riskAssessmentPage,
    direct: true,
})
