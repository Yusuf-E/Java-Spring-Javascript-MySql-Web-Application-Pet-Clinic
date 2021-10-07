let rowid = 0;

function fncAddFormRow(){
    let formhtml = ``
    rowid++;
    formhtml+=`<div class="row" id="rowid`+rowid+`" >
        <div class="col-sm-1">
          <div class="col-sm-4"></div>
          <div class="col-sm-4"><button type="button" class="btn btn-danger mt-5"onclick="fncRowDelete(`+rowid+`)">Sil</button></div>
          <div class="col-sm-4"></div>
        </div>
        
        <div class="col-sm-10">
          <div class="row">
            <div class="col-md-4 mb-3">
              <label for="cpatient`+rowid+`" class="form-label">Hasta Adı</label>
              <input type="text" name="cpatient`+rowid+`" id="cpatient`+rowid+`" class="form-control"  required />
            </div>

            <div class="col-md-4 mb-3">
              <label for="cchip`+rowid+`" class="form-label">Çip Numarası</label>
              <input type="number" name="cchip`+rowid+`" id="cchip`+rowid+`" class="form-control"  required />
            </div>

            <div class="col-md-4 mb-3">
              <label for="creport`+rowid+`" class="form-label">Karne / Küpe Numarası</label>
              <input type="number" name="creport`+rowid+`" id="creport`+rowid+`" class="form-control"  required />
            </div>


            <div class="col-md-4 mb-3">
              <label for="cbirth`+rowid+`" class="form-label">Doğum Tarihi</label>
              <input type="text" name="cbirth`+rowid+`" id="cbirth`+rowid+`" class="form-control" />
            </div>

            <div class="col-md-4 mb-3">
              <label for="ckind`+rowid+`" class="form-label">Tür</label>
              <select class="form-select" name="ckind`+rowid+`" id="ckind`+rowid+`">
                <option value="0" >Seçiniz</option>
                <option value="1">Kedi</option>
                <option value="2">Köpek</option>
                <option value="3">Kanatlı</option>
                <option value="4">Büyükbaş</option>
                <option value="5">Egzotik</option>
                <option value="6">Diğer</option>
              </select>
            </div>

            <div class="col-md-4 mb-3">
              <label  class="form-label" >Renk</label>
                    <select  id="petcolor`+rowid+`" class="selectpicker" data-width="100%"  data-live-search="true">

                    </select>
            </div>


            <div class="col-md-4 mb-3">
                <div class="row">
                  <div class="col-sm-9">
                    <label  class="form-label" >Irkı</label>
                    <select  id="petrace`+rowid+`" class="selectpicker" data-width="100%"  data-live-search="true">

                    </select>

                  </div>
                  <div class="col-sm-3" style="float: left">
                    <label style="color: white"> ekle</label>
                    <button type="button" class=" btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal1">...</button>
                  </div>
                </div>
              </div>

            <div class="col-md-4 mb-3">
              <label  class="form-label">Cinsiyet</label>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios`+rowid+`" id="cMale`+rowid+`" value="option1" checked>
                <label class="form-check-label" for="exampleRadios`+rowid+`">
                  Erkek
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios`+rowid+`" id="cFemale`+rowid+`" value="option2">
                <label class="form-check-label" for="exampleRadios`+rowid+`">
                  Dişi
                </label>
              </div>
            </div>

            <div class="col-md-4 mb-3">
              <label  class="form-label">Kısırlaştırılmış</label>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="cOption`+rowid+`" id="cYes`+rowid+`" value="option3" checked>
                <label class="form-check-label" for="cYes`+rowid+`">
                  Evet
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="cOption`+rowid+`" id="cNo`+rowid+`" value="option4">
                <label class="form-check-label" for="cNo`+rowid+`">
                  Hayır
                </label>
              </div>
            </div>

          </div>

          <hr>
        </div>
        
      </div>`
    $("#form-loop").append(formhtml);
    allRace(0)
    allColor(0)
}

function fncRowDelete(deleteId){
    var myobj = document.getElementById("rowid"+ deleteId);
    myobj.remove();
    rowid--;
    j--;
    x--;
    console.log('j : '+j)
    console.log('rowid : '+rowid)
}


let select_id = 0
function addCustomer(){
    const cname = $("#cname").val()
    const csurname = $("#csurname").val()
    const mobile_phone = $("#mobile_phone").val()
    const email = $("#email").val()
    const tax = $("#tax").val()
    const tax_administration = $("#tax_administration").val()
    const ctype = $("#ctype").val()
    const cNote = $("#cnote").val()
    const cProvince = $("#cprovince").val()
    const cDistrict = $("#cdistrict").val()
    const cAddress = $("#caddress").val()
    const cDiscount = $("#cdiscount").val()

    const objCus = {
        cname: cname,
        csurname: csurname,
        mobile_phone:mobile_phone,
        email: email,
        tax: tax,
        tax_administration:tax_administration,
        ctype: ctype,
        cnote: cNote,
        cprovince:cProvince,
        cdistrict: cDistrict,
        caddress: cAddress,
        cdiscount:cDiscount

    }
    let petList = [];
    for (let i = 0; i <= rowid; i++) {

        const cpatient = $("#cpatient"+i).val()
        const cchip = $("#cchip"+i).val()
        const creport = $("#creport"+i).val()
        const cbirth = $("#cbirth"+i).val()
        const ckind = $("#ckind"+i).val()
        const ccolor = $("#petcolor"+i).val()
        const crace = $("#petrace"+i).val()
        let cgender;
        let cbarren;
        if($("#cMale"+i).is(":checked")){
            cgender = 'Erkek'
        }
        if($("#cFemale"+i).is(":checked")){
            cgender = 'Dişi'
        }
        if($("#cYes"+i).is(":checked")){
            cbarren = 'Kısır'
        }
        if($("#cNo"+i).is(":checked")){
            cbarren = 'Kısır Değil'
        }

        window['objPet' + i]  = {
            cpatient: cpatient,
            cchip: cchip,
            creport:creport,
            cbirth: cbirth,
            ckind: ckind,
            ccolor:ccolor,
            crace: crace,
            cgender: cgender,
            cbarren: cbarren
        }
        petList.push( window['objPet' + i] );


    }
    var postData = {
        cus: objCus,
        pets: petList
    };
    console.log(petList)

    $.ajax({
        url: './customer/add',
        type: 'POST',
        data: JSON.stringify(postData),
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data) {
                $("#cname").val("")
                $("#csurname").val("")
                $("#mobile_phone").val("")
                $("#email").val("")
                $("#tax").val("")
                $("#tax_administration").val("")
                $("#ctype").val("")
                $("#cnote").val("")
                console.log(data)
                alert("İşlem Başarılı!")
                window.location.reload(true);


            } else {
                console.log("İşlem sırasında hata oluştu!")
            }
        },
        error: function (err) {
            console.log(err)
            alert("İşlem sırısında bir hata oluştu!");
        }
    })






    /* console.log(obj);
     if ( select_pid != 0 ) {
         // update
         obj["pid"] = select_pid;
     }






     console.log(obj);
     if ( select_id != 0 ) {
         // update
         obj["cid"] = select_id;
     }
     $.ajax({
         url: './customer/add',
         type: 'POST',
         data: JSON.stringify(objCus),
         dataType: 'JSON',
         contentType: 'application/json; charset=utf-8',
         success: function (data) {
             if (data) {
                 $("#cname").val("")
                 $("#csurname").val("")
                 $("#mobile_phone").val("")
                 $("#email").val("")
                 $("#tax").val("")
                 $("#tax_administration").val("")
                 $("#ctype").val("")
                 $("#cnote").val("")
                 console.log(data)

             } else {
                 console.log("İşlem sırasında hata oluştu!")
             }
         },
         error: function (err) {
             console.log(err)
             alert("İşlem sırısında bir hata oluştu!");
         }
     })*/
}


let select_pid = 0
$('#form-loop').submit( (event) =>{
    event.preventDefault();

    const cpatient = $("#cpatient").val()
    const cchip = $("#cchip").val()
    const creport = $("#creport").val()
    const cbirth = $("#cbirth").val()
    const ckind = $("#ckind").val()
    const ccolor = $("#ccolor").val()
    const crace = $("#crace").val()
    let cgender;
    let cbarren;
    if($("#exampleRadios1").is(":checked")){
        cgender = 'Erkek'
    }
    if($("#exampleRadios2").is(":checked")){
        cgender = 'Dişi'
    }
    if($("#exampleRadios3").is(":checked")){
        cbarren = 'Kısır'
    }
    if($("#exampleRadios4").is(":checked")){
        cbarren = 'Kısır Değil'
    }


    const obj = {
        cpatient: cpatient,
        cchip: cchip,
        creport:creport,
        cbirth: cbirth,
        ckind: ckind,
        ccolor:ccolor,
        crace: crace,
        cgender: cgender,
        cbarren: cbarren


    }
    console.log(obj);
    if ( select_pid != 0 ) {
        // update
        obj["pid"] = select_pid;
    }
    $.ajax({
        url: './customer/petAdd',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data) {
                /* $("#cname").val("")
                 $("#csurname").val("")
                 $("#mobile_phone").val("")
                 $("#email").val("")
                 $("#tax").val("")
                 $("#tax_administration").val("")
                 $("#ctype").val("")
                 $("#cnote").val("")*/
                console.log(data)

            } else {
                console.log("İşlem sırasında hata oluştu!")
            }
        },
        error: function (err) {
            console.log(err)
            alert("İşlem sırısında bir hata oluştu!");
        }
    })
})

let select_pcid = 0
$('#form-color').submit( (event) =>{
    event.preventDefault();

    const  pcolor = $("#pcolor").val()


    const obj = {
        pcolor: pcolor,


    }
    console.log(obj);
    if ( select_pcid != 0 ) {
        // update
        obj["pcid"] = select_pcid;
    }
    $.ajax({
        url: './customer/addColor',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data) {
                $("#pcolor").val("")
                allColor(1);
                console.log(data)

            } else {
                console.log("İşlem sırasında hata oluştu!")
            }
        },
        error: function (err) {
            console.log(err)
            alert("İşlem sırısında bir hata oluştu!");
        }
    })
})

let select_prid = 0
$('#form-race').submit( (event) =>{
    event.preventDefault();

    const  prace = $("#prace1").val()


    const obj = {
        prace: prace,


    }
    console.log(obj);
    if ( select_prid != 0 ) {
        // update
        obj["prid"] = select_prid;
    }
    $.ajax({
        url: './customer/addRace',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data) {
                $("#prace1").val("")
                allRace(1);
                console.log(data)

            } else {
                console.log("İşlem sırasında hata oluştu!")
            }
        },
        error: function (err) {
            console.log(err)
            alert("İşlem sırısında bir hata oluştu!");
        }
    })
})

allRace(0);
allColor(0);

function allRace(selectData){

    $.ajax({
        url:"./customer/races",
        type:"GET",
        dataType:"Json",
        success:function ( data ){

            if(selectData == 1){
                updatedRaceList(data);
            }else {
                createRace( data);
            }
        },
        error : function ( err ){
            console.log(err);
        }
    })
}
let j =0;
function createRace( data ){
    $("#petrace"+j).find('option').remove().end();
    $("#petrace"+j).append( `<option data-subtext=""> Seçim Yapınız </option> `);
    while (j <= rowid){
        for (let i = 0; i<data.length;i++){
            const itm = data[i];
            const st = itm.prace;
            console.log(st);
            $("#petrace"+j).append(`<option data-subtext="" value=" `+itm.rid+` ">`+st+`</option> `) ;
        }
        $("#petrace"+j).selectpicker("refresh");
        j++
    }
}
function allColor(selectData){

    $.ajax({
        url:"./customer/colors",
        type:"GET",
        dataType:"Json",
        success:function ( data ){
            if(selectData == 1){
                updatedColorList(data)
            }else {
                createColor( data);
            }
        },
        error : function ( err ){
            console.log(err);
        }
    })
}
let x = 0;
function createColor( data ){
    $("#petcolor"+x).find('option').remove().end();
    $("#petcolor"+x).append( `<option data-subtext=""> Seçim Yapınız </option> `);
    while (x <= rowid){
        for (let i = 0; i<data.length;i++){
            const itm = data[i];
            const st = itm.pcolor;
            console.log(st);
            $("#petcolor"+x).append(`<option data-subtext="" value=" `+itm.pcid+` ">`+st+`</option> `) ;
        }
        $("#petcolor"+x).selectpicker("refresh");
        x++
    }
}
function updatedRaceList( data ) {
    let k = 0;
    console.log('k : ' + k)

    while (k <= rowid){
        $("#petrace"+k).find('option').remove().end();
        $("#petrace"+k).append( `<option data-subtext=""> Seçim Yapınız </option> `);
        for (let i = 0; i<data.length;i++){
            const itm = data[i];
            const st = itm.prace;
            console.log(st);
            $("#petrace"+k).append(`<option data-subtext="" value=" `+itm.rid+` ">`+st+`</option> `) ;
        }

        $("#petrace"+k).selectpicker("refresh");
        k++
        console.log('k : ' + k)
    }
}
function updatedColorList( data ) {
    let k = 0;
    console.log('k : ' + k)

    while (k <= rowid){
        $("#petcolor"+k).find('option').remove().end();
        $("#petcolor"+k).append( `<option data-subtext=""> Seçim Yapınız </option> `);
        for (let i = 0; i<data.length;i++){
            const itm = data[i];
            const st = itm.pcolor;
            console.log(st);
            $("#petcolor"+k).append(`<option data-subtext="" value=" `+itm.pcid+` ">`+st+`</option> `) ;
        }

        $("#petcolor"+k).selectpicker("refresh");
        k++

    }
}