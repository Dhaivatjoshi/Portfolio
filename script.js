    // Tab functionality
    const version = "1.2.1-alpha";
    var tablinks = document.getElementsByClassName("tab-links");
    var tabcontents = document.getElementsByClassName("tab-contents");

    function opentab(tabname){
        for(tablink of tablinks){
            tablink.classList.remove("active-link");
        }
        for(tabcontent of tabcontents){
            tabcontent.classList.remove("active-tab");
        }
        event.currentTarget.classList.add("active-link");
        document.getElementById(tabname).classList.add("active-tab");
    }

    // Side menu functionality
    var sidemenu = document.getElementById("sidemenu");

    function openmenu(){
        sidemenu.style.right = "0";
    }
    function closemenu(){
        sidemenu.style.right = "-250px";
    }

    // Form submission to Google Sheets
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwC_tYn5pyEFKkWjrzwotZUfojRowbvGJtsj3-6DmYSguJrKhE0W0ObWBJAUTSoPR8/exec';
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById("msg");

    form.addEventListener('submit', e => {
        e.preventDefault();
        spinner.style.display = 'inline-block';
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';

        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {

                spinner.style.display = 'none';
                submitButton.disabled = false;
                msg.innerHTML = "Message sent successfully";
                setTimeout(function(){
                    msg.innerHTML = "";
                }, 5000);
                form.reset();
            })
            .catch(error => console.error('Error!', error.message));
    });

    // Define and set the version number
    
    document.getElementById("version-number").textContent = version;
