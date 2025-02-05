import file from '@system.file'
import {Core, ExpectExtend} from 'deccjsunit/index'

export default {
    data: {
        title: ""
    },
    onInit() {
        this.title = this.$t('strings.world');
    },
    onShow() {
        console.info('onShow finish')

        const core = Core.getInstance()
        const expectExtend = new ExpectExtend({
            'id': 'extend'
        })
        core.addService('expect', expectExtend)
        core.init()

        const configService = core.getDefaultService('config')
        configService.setConfig(this)

        require('../../../test/List.test')
        core.execute()
    },
    onReady() {
        console.info('onReady');
    },
}

