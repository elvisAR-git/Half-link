function submitURL(element) {
    document.getElementById("copybtn").innerText = "Copy"
    if (element.value.length > 8) {
        document.getElementById("loader").classList.remove("hide")
        var url = element.value
        console.log(url)
        let xhr = new XMLHttpRequest()

        xhr.open("POST", "https://half-link.herokuapp.com/shorten")
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (this.status == 200) {
                var resp = JSON.parse(this.response)
                document.getElementById("modaltitle").innerText = "Your shortened link"
                console.log(resp)
                document.getElementById("loader").classList.add("hide")
                document.getElementById("urlmodal").classList.remove("hide")
                document.getElementById("linkspace").innerText = resp.half
                document.getElementById("linkspace").href = resp.half
                var page = document.getElementsByTagName('body')[0];
                page.classList.add("noscroll")
            }
        }
        xhr.send(JSON.stringify({
            url: url
        }))
    } else {
        document.getElementById("modaltitle").innerText = "Oops! please enter a valid URL"
        document.getElementById("loader").classList.add("hide")
        document.getElementById("urlmodal").classList.remove("hide")
        document.getElementById("linkspace").innerText = ""
        document.getElementById("linkspace").href = ""
        var page = document.getElementsByTagName('body')[0];
        page.classList.add("noscroll")
    }
}

function dismiss() {
    document.getElementById("urlmodal").classList.add("hide")
    var page = document.getElementsByTagName('body')[0];
    page.classList.remove("noscroll")
    document.getElementById('url').value = ""
}


function copy() {
    var copyText = document.getElementById("linkspace").innerText
    navigator.clipboard.writeText(copyText).then(function () {
        document.getElementById("copybtn").innerText = "Copied!"
    }, function (err) {
        document.getElementById("copybtn").innerText = "Could not copy!"
    });

}