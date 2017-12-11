class Calendar{
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
        this.checkOptions()
        this.generatecalendar()
        
    }
    checkOptions(){
        // 检查元素
        if(!this.options.element){
            throw new Error('element is required')
        }    
        return this
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
    nextMonth(){
        this.currentDate = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth()+1,1)
        this.generatecalendar()
    }
    previousMonth(){
        this.currentDate = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),0)
        this.generatecalendar()

    }
    resetMonth(){
        this.currentDate = new Date()
        this.generatecalendar()
    }
    generateCurrentMonth(){
        // 产生当前月份的所有天数 
        // 获取当前月份最后一天的日期
        let time = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth() + 1,0)
        let currentMonthLength = time.getDate()
        
        return  createArray({length: currentMonthLength}).map((value,index) => {
             return dom.create(`<li class="currentMonth">${index+1}<li>`)
        })
        
    }
    generatePreviousMonth(){
        // 产生上个月的天数
        // getDay() 方法根据本地时间，返回一个具体日期中一周的第几天，0 表示星期天。
        let monthBeginning = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),1)
        let startPadding = monthBeginning.getDay() >= 1 
        ? monthBeginning.getDay() - 1
        : monthBeginning + 7 - 1
        let previousMonthEnding =  new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),0)
        return createArray({length: startPadding}).map((value,index) => {
            return dom.create(`<li class="previousMonth">${previousMonthEnding.getDate()-index}</li>`)
        }).reverse()

    }
    generateNextMonth(){
        // 产生下个月的天数
        let monthEnding = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth()+1,0)
        let endPadding = monthEnding.getDay() >= 1 ? (7 - monthEnding.getDay()) : monthEnding.getDay()
        let nextMonthBeginning = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth()+1,1)
        return createArray({length: endPadding}).map((value,index) => {
            return dom.create(`<li class="nextMonth">${nextMonthBeginning.getDate() + index}</li>`)
        })
        
    }
    generateDays(){
        // 产生目前页面所有天数
        let days = this.generatePreviousMonth().concat(this.generateCurrentMonth())
        .concat(this.generateNextMonth())
        return dom.create('<ol class="days"></ol>',days)
        
    }
    generatecalendar(){
        this.options.element.innerHTML = ''
        this.generateWeekdays()
        let ol = this.generateDays()
        //this.options.element.remove(ol)
        
        this.options.element.appendChild(ol)
        this.options.day.textContent = this.options.output(this.currentDate)
        // 产生日历ol.days ol.weekdays 并append带div.calendar中
    }
    
}
// 最好创建个数组，因为在涉及上一个月的日期需要颠倒一下数据，以及后续很多都会涉及对数组的一些操作
// 创建一个array,长度为length，内容为fill
function createArray({length,fill}){
    let array = Array.apply(null,{length: length})
    if(fill !== undefined){
        array = array.map(() => { fill })
    }
    return array
}
