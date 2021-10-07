let globalCusArr
allCustomer()
dateCount()
function dateCount(){
    $.ajax({
        url: '/statistics/countDate/',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            console.log(data)
            $("#dateCount").text(data)
        },
        error: function (err){
            console.log(err)
        }
    })
}



function allCustomer(){
    $.ajax({
        url: '/customer/clist',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            console.log("data:"+data)
            globalCusArr = data
            weeklyCount()
            weeklyMostCustomers()
        },
        error: function (err){
            console.log(err)
        }
    })
}

function weeklyCount(){
    $.ajax({
        url: '/statistics/weeklyCus',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            console.log(data)
            weeklyCustomer(data)
        },
        error: function (err){
            console.log(err)
        }
    })
}
function weeklyCustomer(data){
    let temp=0;
    let temp2=0;
    let temp3=0;
    let temp4=0;
    let day1=0;
    let day2=0;
    let weekCus;


    for (let i = 0 ; i<globalCusArr.length;i++){
        for (let j = 0 ; j<globalCusArr[i].pets.length;j++){
            for (let k = 0 ; k<data.length; k++){
                const itm = data[k]
                if (globalCusArr[i].pets[j].pid == itm.pet.pid){
                    temp++
                    if( temp > temp2 ){
                        temp2 = temp
                        weekCus = globalCusArr[j].cname
                        console.log(weekCus);
                    }
                }
            }
            temp = 0;
        }
    }
    for (let i = 0;i<data.length;i++){
        for (let j = 0; j<data.length;j++){
            const itm = data[j];
            day1 = itm.date;

            if (day1 == itm.date){
                temp3++;
                if (temp3> temp4){
                    temp4 = temp3;
                    day2 = day1;
                }
            }
        }
        temp3 = 0;
    }
    $("#cusName").text(weekCus)
    $("#cusCount").text(temp2)
    $("#sdate").text(day2)
    $("#opCount").text(temp4)

}

function weeklyMostCustomers(){
    $.ajax({
        url: '/statistics/weeklyCuslist',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            console.log(data)
            weeklyCustomerMost(data)
        },
        error: function (err){
            console.log(err)
        }
    })
}

function weeklyCustomerMost( data ){
    let paymenttype ;
    let html = ``
    for (let i = 0; i<data.length;i++){
        const itm = data[i];
        for (let j = 0; j<globalCusArr.length;j++){
            if (itm.cus_id == globalCusArr[j].cid){
                if (itm.paymenttype == 1){
                    paymenttype = "Nakit"
                }
                else if (itm.paymenttype == 2){
                    paymenttype = "Banka Kartı"
                }
                else {
                    paymenttype = "Banka Havale"
                }
                html+=`<tr>
                            <td scope="col">`+globalCusArr[j].cname + globalCusArr[j].csurname+`</td>
                            <td scope="col">`+paymenttype+`</td>
                            <td scope="col">`+itm.amount + "₺"+`</td>

                        </tr>`
            }
        }
    }
    $('#bestCustomers').html(html)
}

allSafe();
function allSafe(){
    $.ajax({
        url: '/company-cashier/list',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            console.log(data)
            earnPaymentType(data)

        },
        error: function (err){
            console.log(err)
        }
    })
}

function earnPaymentType(data){
    let cash = 0;
    let bankcard =0;
    let bank =0;
    let html = ``;
    for (let i = 0; i<data.length; i++){
        const itm = data[i];
        if (itm.opestatus == false){
            if (itm.paymenttype == 1){
                cash+= itm.amount;
            }
            else if (itm.paymenttype == 2){
                bankcard+= itm.amount;
            }
            else{
                bank+= itm.amount;
            }
        }
    }
    html+=`<tr>
                  <td scope="col">Nakit</td>
                  <td scope="col">`+cash+"₺"+`</td>

                        </tr>
                        <tr>
                  <td scope="col">Banka Kartı</td>
                  <td scope="col">`+bankcard+"₺"+`</td>

                        </tr>
                        <tr>
                  <td scope="col">Banka Havale</td>
                  <td scope="col">`+bank+"₺"+`</td>

                        </tr>`
    $('#payment-type').html(html);

}





