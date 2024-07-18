$(document).ready(function () {
    $("#fInitial").text($("#userName").text().charAt(0));

    $(window).on('load', function () {
        if ($(this)[0].location.pathname == "/Communications") {
            scrollToBottom($(".chat_windows"));
        }
    })

    $("#messageInput").on('focus', function () {
        scrollToBottom($(".chat_windows"));
    });

    $(".shop-link").on('click', function () {
        window.location.href = "/Home/Shop";
    });

    $(".chat-link").on('click', function () {
        window.location.href = "/Communications";
    });

    $(".folder-link").on('click', function () {
        window.location.href = "/Profile/FileManager";
    });

    $(".taskboard-link").on('click', function () {
        window.location.href = "/Profile/TaskBoard";
    });

    $(".schedule-link").on('click', function () {
        window.location.href = "/Profile/Schedule";
    });
    $(".schedule-link-ai").on('click', function () {
        window.location.href = "/Profile/Schedule/#";
    });

    $(".staff-link").on('click', function () {
        window.location.href = "/Profile/Staff";
    });

    $("div[class*='view-teamate'").on('click', function () {
        //window.location.href = "/Profile/AboutMe";
    });

    $(".task-link").on('click', function () {
        $('#existingTaskModal').modal('hide');
        $("#generalTaskSubmitBtn").attr('type', 'button');
        $('#generalTaskInput').val('');
        $("#addTaskModal").modal('show');
    });

    // Functions
    function scrollToBottom(selectedClass) {
        selectedClass[0].scrollTop = selectedClass[0].scrollHeight;
    }
});

function viewPass() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}