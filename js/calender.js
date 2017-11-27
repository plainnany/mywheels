class Calender{
    constructor(options){
        let defaultOptions = {
            element: '',
            dayTemplate: `
                <li></li>
            `,
            days: {0:'周日',1: '周一',2:'周二',3:'周三',4:'周四',5:'周五',6:'周六'},
            output: date => `${date.getFullYear()}年${date.getMonth()+1}月`
        }
        this.options = Object.assign({},defaultOptions,options)
        this.currentDate = new Date()

    }
    checkOptions(){
        if(!this.options.element){
            throw new Error('element is required')
        }
        // 检查元素
    }
    generateWeekdays(){

        // 产生周一到周日 添加到ol.weekdays中
    }
    generateCurrentMonth(){
        // 产生当前月份的天数 
    }
    generatePreviousMonth(){
        // 产生上个月的天数
    }
    generateNextMonth(){
        // 产生下个月的天数
    }
    generateDays(){
        // 产生目前页面所有天数
    }
    generateCalender(){
        // 产生日历ol.days ol.weekdays 并append带div.calender中
    }
    
}