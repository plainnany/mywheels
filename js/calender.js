class Calender{
    constructor(options){
        let defaultOptions = {
            element: '',
            dayTemplate: `
                <li></li>
            `,
            weekdays: ['周日','周一','周二','周三','周四','周五','周六'],
            day: n => n,
            output: date => `${date.getFullYear()}年${date.getMonth()+1}月`
        }
        this.options = Object.assign({},defaultOptions,options)
        this.currentDate = new Date()
        this.generateWeekdays()
    }
    checkOptions(){
        // 检查元素
        if(!this.options.element){
            throw new Error('element is required')
        }    
    }
    generateWeekdays(){
        // 产生周一到周日 添加到ol.weekdays中
        let { weekdays } = this.options
        let li = weekdays.map((value,index) => {
            let n = (index >= 6 ? index + 1 - 7 : index + 1 )
            return dom.create(`<li>${weekdays[n]}</li>`)
        })
        let ol = dom.create('<ol class="weekdays"></ol>',li)
        this.options.element.appendChild(ol)
        
    }
    generateCurrentMonth(){
        // 产生当前月份的所有天数 

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

function createArray(){

}
