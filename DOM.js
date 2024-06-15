

const userInput = document.querySelector ("#user_input");
const userPassword = document.querySelector ("#user_password");
const sendButton = document.querySelector ("#send_button");

const accounts = [
    {mail: "jose123", balance: 900, password:"123456"},
    {mail: "pablo123", balance: 500, password:"78910"},
    {mail: "jardon123", balance: 700, password:"11121314"},
    {mail: "urzua123", balance: 300, password:"15161718"},
];


sendButton.addEventListener("click", clickHandler);
function clickHandler (){
    const loginSection = document.querySelector("#login_sec");
    const loginSectionb = document.querySelector("#login_sec_b");
    const homeSection = document.querySelector ("#home_sec");
    const user=userInput.value;
    const password=userPassword.value;
    let loginFlag= null;


    function renderingBalance(obj){
        let template = `
        <section id="bancaenlinea" class="row text-white justify-content-center">
        <div class="col-12 text-center">
            <h1>Bienvenido de nuevo ${obj.mail}</h1>
            <h2>Saldo: ${obj.balance}</h2>
            <div class="mb-3 col-6 mx-auto">
            <label for="usuario" class="form-label"> Indica el monto que quieres modificar </label>
            <input name="saldo" type="number" class="form-control" id="input_saldo">
            </div>
        </div>
        </section>
        <section id="login_sec_b" class="text-center">
        <div class="form-container-dos">
        <button id="add_balance_btn" class="btn btn-primary btn-sm">Agregar Saldo</button>
        <button id="rmv_balance_btn" class="btn btn-primary btn-sm">Retirar Saldo</button>
        </div>
        </section>
        `
        homeSection.innerHTML = template;
        const addBalanceButton = document.querySelector("#add_balance_btn");
        addBalanceButton.addEventListener("click",addBalanceHandler);   
        const rmvBalanceButton =document.querySelector("#rmv_balance_btn");
        rmvBalanceButton.addEventListener("click", rmvBalanceHandler);
    }

    function addBalanceHandler (){
        const addBalanceInput = document.querySelector("#input_saldo");
        const current = localStorage.getItem ("balance");
        let newBalance= parseInt(current)+ parseInt(addBalanceInput.value);
        localStorage.setItem("balance", newBalance);

        const mail =localStorage.getItem("mail");
        const balance= localStorage.getItem("balance");
        
        renderingBalance({mail: mail, balance: balance});}
    
        function rmvBalanceHandler(){
            const rmvBalanceInput = document.querySelector("#input_saldo");
            const current = localStorage.getItem ("balance");
            let newBalance= parseInt(current)- parseInt(rmvBalanceInput.value);
            localStorage.setItem("balance",newBalance);

            const mail =localStorage.getItem("mail");
            const balance =localStorage.getItem("balance");
            renderingBalance ({mail: mail, balance: balance});
        }

    function loginSuccessfully(obj){
        console.log("Login Successfull");
        localStorage.setItem("mail",obj.mail);
        localStorage.setItem("password",obj.password);
        localStorage.setItem("balance",obj.balance);
        console.log(localStorage.getItem("mail"));

        loginSection.style.display = "none"; 
        loginSectionb.style.display= "none";
        homeSection.classList= "";   
        renderingBalance(obj);
    }

    for(let i=0; i<accounts.length; i++){
        accounts [i].mail === user && accounts [i].password === password ? 
        loginFlag= accounts[i]: null;}

        loginFlag !== null? loginSuccessfully(loginFlag): alert("Usuario o contraseña incorrecto");}
