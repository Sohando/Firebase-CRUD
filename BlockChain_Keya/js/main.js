var found; 
var match;
var prev_name;
var obj;
var update_key;
var firebaseConfig = {
    apiKey: "AIzaSyD-yD16zThYc4uGEqomMA-ryAMctH2jxew",
    authDomain: "blockchain-d9757.firebaseapp.com",
    databaseURL: "https://blockchain-d9757.firebaseio.com",
    projectId: "blockchain-d9757",
    storageBucket: "blockchain-d9757.appspot.com",
    messagingSenderId: "254138828766",
    appId: "1:254138828766:web:51ab789b02958eb5603f4f",
    measurementId: "G-M468T06SPH"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    // firebase.analytics();
}

function Registration() {
    const rootRef = firebase.database().ref("resources/");
    var autoID = rootRef.push().key;
    rootRef.push({
        plot_no: localStorage.getItem("plot_no"),
        owner_name: localStorage.getItem("own_name"),
        owner_nid: localStorage.getItem("own_nid"),
        city_jarip_no: localStorage.getItem("jorip_no"),
        mouja_o: localStorage.getItem("mouja_no"),
        email: localStorage.getItem("email"),
        prev_owner_name: localStorage.getItem("prev_own_name"),
        prev_owner_nid: localStorage.getItem("prev_own_nid"),
        prev_owner_email: localStorage.getItem("prev_own_email"),
        reg_date: localStorage.getItem("reg_date"),
        autoid: autoID,
        mutation_no: "",
        mutation_date: ""
    });
    localStorage.setItem("Registration", 0);
}

function Search(key) {
    found = false;
    const rootRef = firebase.database().ref("resources/");
    listTableHead = document.getElementById("head");
    listTableBody = document.getElementById("body");
    listTableBody.textContent = "";
    rootRef.on("value",
        (snapshot) => {
            snapshot.forEach((child) => {
                resouces = child.val();
                // console.log(resouces.plot_no);
                if (resouces.plot_no == key) {
                    // console.log(resouces.prev_owner_name + " prev");
                    notify = document.getElementById("x");
                    notify.textContent = ""
                    obj = {
                        PName: resouces.prev_owner_name,
                        PNid: resouces.prev_owner_nid,
                        OName: resouces.owner_name,
                        ONid: resouces.owner_nid,
                        RDate: resouces.reg_date
                    }
                    found = true;
                    //return;
                    // document.getElementById("tbl").style.display="visible";
                    listTableHead.textContent = "";
                    var row = document.createElement("tr");
                    row.innerHTML =
                         "<th>" + "Previous Owner's Name" + "</th>" +
                         "<th>" + "Previous Owner's NID" + "</th>" +
                         "<th>" + "New Owner's Name" + "</th>" +
                         "<th>" + "New Owner's NID" + "</th>" +
                         "<th>" + "Registration Date" + "</th>";
                    listTableHead.append(row);
                    var row = document.createElement("tr");
                    row.innerHTML =
                        "<td>" + obj.PName + "</td>" +
                        "<td>" + obj.PNid + "</td>" +
                        "<td>" + obj.OName + "</td>" +
                        "<td>" + obj.ONid + "</td>" +
                        "<td>" + obj.RDate + "</td>";
                    listTableBody.append(row);
                }
            });
        },
        (error) => {
            console.log("Error: " + error.code);
        }
    );
    if (found == false) {
        listTableHead = document.getElementById("head");
        listTableHead.textContent = "";
        listTableBody = document.getElementById("body");
        listTableBody.textContent = "";
        // document.getElementById("tbl").textContent = "";
        notify = document.getElementById("x");
        notify.textContent = "Not Found";
        // alert("hidden");
    }
}
function Match(plot, nid) {
    const rootRef = firebase.database().ref("resources/");
    // alert(plot + " " + nid)
    // console.log(rootRef);
    match = false;
    rootRef.on("value",
    (snapshot) => {
        snapshot.forEach((child) => {
            issue = child.val();
             console.log(issue.plot_no);
            // alert("asdfasd");
                // alert(issue.plot_no + " " + issue.owner_nid); 
                if (issue.plot_no == plot && issue.owner_nid==nid) {
                    // match = true;
                    // alert(this.value + " " + child.key);
                    // issue.autoid;
                    // update_key = child.key;
                    localStorage.setItem("u_key", child.key);
                    // alert(update_key);
                    window.location.href = "mutation2.html";
                }
         });
    },
    (error) => {
        console.log("Error: " + error.code);
    }
    );
    match = false;
}
function Update(mutation_no, mutation_date) {
    // alert(mutation_no + " " + mutation_date);
    update_key = localStorage.getItem("u_key");
    alert(update_key);
    var recordRef = firebase.database().ref("resources/" + update_key);
        recordRef.update({
            "mutation_no" : mutation_no,
            "mutation_date" : mutation_date
    });
    document.getElementById("X").innerHTML = "Successfully added" + mutation_no;
}
if (localStorage.getItem("Registration") != 0) {
    Registration();
}
