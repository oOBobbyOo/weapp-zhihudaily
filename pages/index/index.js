//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util.js')

Page({
    data: {
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 2000,
        loading: false,
        plain: false,
        list: []
    },
    onLoad: function() {
        let that = this
        wx.request({
            url: 'http://news-at.zhihu.com/api/4/news/latest',
            headers: {
                'Content-Type': 'application/json'
            },
            success(res) {
                that.setData({
                    banner: res.data.top_stories,
                    list: [{ header: '今日热闻' }].concat(res.data.stories)
                })
            }
        })
        this.index = 1
    },
    getNextDate() {
        const now = new Date()
        now.setDate(now.getDate() - this.index++)
        return now
    },
    loadMore(e) {
        if (this.data.list.length === 0) return
        var date = this.getNextDate()
        var that = this
        that.setData({ loading: true })
        wx.request({
            url: 'http://news.at.zhihu.com/api/4/news/before/' + (Number(utils.formatDate(date)) + 1),
            headers: {
                'Content-Type': 'application/json'
            },
            success(res) {
                that.setData({
                    loading: false,
                    list: that.data.list.concat([{ header: utils.formatDate(date, '-') }]).concat(res.data.stories)
                })
            }
        })
    }
})