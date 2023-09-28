(function () {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    let today = new Date(),
        dd = String(today.getDate()).padStart(2, "0"),
        mm = String(today.getMonth() + 1).padStart(2, "0"),
        yyyy = 2023,
        dayMonth = "06/30/",
        expectedDate = dayMonth + yyyy;

    today = mm + "/" + dd + "/" + yyyy;

    const countDown = new Date(expectedDate).getTime(),
        x = setInterval(function () {

            const now = new Date().getTime(),
                distance = countDown - now;

            document.getElementById("days").innerText = Math.floor(distance / (day)),
                document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
                document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
                document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

            if (distance < 0) {
                document.getElementById("headline").innerText = "It's TIME!";
                document.getElementById("content").innerText =
                    "Thank you all for waiting with me for this moment." +
                    "As the CEO and Founder of Software Cake LLC, I am proud to announce our upcoming BETA Launch." +
                    "This July, we will release our first promotional video and our first wave of Beta products called Documentation Phasing." +
                    "This portion of the Beta tests will focus on documentation management and." +
                    "If you are interested in being a Beta Tester, please fill out the form below. \n" + 
                    `
                    Thank you,
                    Ms.T Howard
                    Founder / CEO \n`;
                document.getElementById("betaForm").innerHTML += `<a href="https://forms.gle/Kj2NfzQDazX4gD5y8">
                <button class="oval-lg schedule-link n-inputs" style="box-shadow: none; width:auto">
                    <span>Beta Wait List</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-ui-checks" viewBox="0 0 16 16">
                      <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708l-2 2zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708l-2 2zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </button></a>`;

                document.getElementById("countdown").style.display = "none";
                document.getElementById("content").style.display = "block";
                document.getElementById("content").style.textAlign = "left";
                clearInterval(x);
            }
        }, 0)
}());
