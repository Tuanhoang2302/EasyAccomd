{isSelectRentDayButton || isSelectReturnDayButton ? 
    <div style={{position: "absolute", zIndex: 1}}>
    {(()=> {
        var disabledDates=[]
        if(reservationDate){
            for(let i = 0; i < reservationDate.length; i++){
                var startDate = Date.parse(reservationDate[i].startDate)
                var endDate = Date.parse(reservationDate[i].endDate)
                var Difference_In_Time = endDate - startDate
                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

                for(let j = 0; j <= Difference_In_Days; j++){
                    var beginDate = new Date(reservationDate[i].startDate)                     
                    beginDate.setDate(beginDate.getDate() + j)
                    disabledDates.push(beginDate)
                }
            }

            var ClickAwayFunc 
            var setDay
            if(isSelectRentDayButton){
                ClickAwayFunc = () => {
                    setIsSelectRentDayButton(false)
                }
                setDay = (value) => {
                    setRentDay(value)
                }
            } else {
                ClickAwayFunc = () => {
                    setIsSelectReturnDayButton(false)
                }
                setDay = (value) => {
                    setReturnDay(value)
                }
            }

            return <ClickAwayListener onClickAway={() => ClickAwayFunc()}>
                        <Calendar tileDisabled={({date, view}) => {
                            return (view === 'month') && // Block day tiles only
                            disabledDates.some(disabledDate =>
                            date.getFullYear() === disabledDate.getFullYear() &&
                            date.getMonth() === disabledDate.getMonth() &&
                            date.getDate() === disabledDate.getDate()
                            )}
                        }
                        minDate={new Date()}
                        onChange={(value, event) => {
                            setDay(value)
                        }}
                    />
                    </ClickAwayListener>
        }else{
            return null
        }
    })()}
    </div>
: null}