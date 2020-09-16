var firebaseConfig = {
    apiKey: "AIzaSyAW3Mks8Q1NkOx2WTSeLvJ2r5iAkiZ8w2g",
    authDomain: "masum-world-peace.firebaseapp.com",
    databaseURL: "https://masum-world-peace.firebaseio.com",
    projectId: "masum-world-peace",
    storageBucket: "masum-world-peace.appspot.com",
    messagingSenderId: "380905873194",
    appId: "1:380905873194:web:d27fd25b13e39d2acfc853",
    measurementId: "G-0XMZNF4R7J"
};

// console.log("Hello");
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Reference
const rootRef = firebase.database().ref("issues/");

// rootRef.push({
//     description: "Logo doesn't show up on screen 3",
//     resolved: "Yes",
//     severity: "minor"
// });
// rootRef.push({
//     description: "Screen flashes on save",
//     resolved: "No",
//     severity: "moderate"
// });
//
// C    R   E   A   T   E
function addNewIssue() {
    const severity = document.getElementById("severity-dropdown").value;
    const description = document.getElementById("description-textfield").value;
    const resolved = document.getElementById("resolved-dropdown").value;

    if (description.length == 0) {
        alert("Description cannot be blank!");
        return;
    }
    //console.log(description);    
    rootRef.push({
        description: description,
        severity: severity,
        resolved: resolved
    });
    document.getElementById("description-textfield").value="";
}
// R    E   A   D
rootRef.on("value",
    (snapshot) => {
        listTableBody = document.getElementById("list-table-body");
        listTableBody.textContent = "";
        snapshot.forEach((child) => {
            issue = child.val();
             // console.log(issue);
            var row = document.createElement("tr");
             // row.innerHTML = "<td>" + issue.severity + "</td><td>" + issue.description + "</td><td>" + issue.resolved + "</td>";
            row.innerHTML = "<td>" + issue.severity + "</td><td>" + encodeHtml(issue.description) + "</td><td>" +
            
              "<select class=\"form-control\" onchange='updateIssue(\"" + child.key + "\", this.value)'>" +
              "<option value='no'" + (issue.resolved=="no" ? " selected" : "") + ">no</option>" +
              "<option value='yes'" + (issue.resolved=="yes" ? " selected" : "") + ">yes</option>" +
            "</select>"
            
            + "</td>" + "<td><input type='button' class='btn btn-danger' value='X' onclick='deleteIssue(\"" + child.key + "\")'/></td>";
             listTableBody.append(row);
         });
    },
    (error) => {
        console.log("Error: " + error.code);
    }
 );
// U    P   D   A   T   E
function updateIssue(issueKey, newResolvedValue) {
    var recordRef = firebase.database().ref("issues/" + issueKey);
    recordRef.update({
        "resolved": newResolvedValue
    });
}
// D    E   L   E   T   E
function deleteIssue(issueKey) {
        //if (confirm("Are you sure?")) {
        //alert("delete function for issue key: " + issueKey);
        var recordRef = firebase.database().ref("issues/" + issueKey);

        recordRef.remove()
        .catch(function(error) {
            alert("Delete failed: " + error.message)
        });    
}
// U    T   I   L   I   T   Y
function encodeHtml(str) {
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/ /g, '&nbsp;');
    return str;
}
