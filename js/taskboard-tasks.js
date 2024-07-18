$(document).ready(function () {
    if (document.URL.includes("/TaskBoard")) {
        if ($(".h-Selected-Data")[0] != null) {
            $(".h-Selected-Data")[0].value = null;
        }

        if (sessionStorage.getItem('excelPreviousPage') != null) {
            sessionStorage.removeItem('excelPreviousPage');
        }

        // Make a session variable
        var currentAdditionKVCount = 1;
        var autoOpenFiles = 0;
        let tested = false;

        $("#generalTaskSelect option:eq(0)").prop("selected", true);
        $('#generalTaskInput').val('');
        $("#generalTaskSubmitBtn").attr('type', 'button');
        $('#generalTaskResponseTextarea').text('');
        $("#generalTaskInput")[0].type = "Text";
        $("#generalTaskInput")[0].multiple = "";
        $("#generalTaskInput")[0].accept = "";
        $('#generalCustomFileName')[0].accept = "";
        $("#generalCustomTaskSelectCrud")[0].disabled = true;
        $("#inlineCheckboxAutoOpen").addClass("visually-hidden");
        $("label[for='inlineCheckboxAutoOpen'").addClass("visually-hidden");
        $("#fileBox").addClass("visually-hidden");
        $("#transferFileLocation").remove();
        $("label[for='transferFileLocation'").remove();
        if ($(".subBtn")[0] != null) {
            $(".subBtn")[0].type = "Button";
        }
        $("#addGeneralTask")[0].type = "Button";
        $("#addGeneralTask")[0].disabled = true;
        $("#generalCusTaskTestBtn")[0].disabled = false;
        $("#generalCustomFileSubmitBtn")[0].disabled = true;
        if ($(".task-start-date")[0] != null) {
            $(".task-start-date")[0].value = null;
        }
        if ($(".task-date")[0] != null) {
            $(".task-date")[0].value = null;
        }
    }

    $('#addKeyValueBtn').on('click', function (event) {
        event.preventDefault();
        $("#apiCustomTaskAddKVSec").append(`<div class="col-md-4">
                                                        <label for="inputApiKeyKV${currentAdditionKVCount}" class="form-label">Key*</label>
                                                        <input type="text" class="form-control"id="inputApiKeyKV${currentAdditionKVCount}" required/>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <label for="inputApiValueKV${currentAdditionKVCount}"" class="form-label">Value*</label>
                                                        <input type="text" class="form-control" id="inputApiValueKV${currentAdditionKVCount}" required/>
                                                    </div>
                                                    <div class="form-check form-switch col-md-4 d-flex align-items-center">
                                                        <input class="form-check-input" type="checkbox" id="inputApiValueOnlyKV${currentAdditionKVCount} required"/>
                                                        <label class="form-check-label ms-1" for="inputApiValueOnlyKV${currentAdditionKVCount}">
                                                            Use Value Only
                                                        </label>
                                                    </div>`);
        currentAdditionKVCount++;
    });

    $("#saveCustomApiBtn").on('click', function () {
        $("#inputApiKey").val();
        $("#inputApiHost").val();
        $("#inputApiURL").val();
        $("#inputApiKeyKV").val();
        $("#inputApiValueKV").val();
    });

    $('#addTaskModal .save-btn').on('click', function () {
        var title = $('#addEventModal input[name="task-name"]').val();
        var assignedAi = $('#addEventModal input[name="assigned-ai-name"]').val();
        var taskType = $('#addEventModal select[name="task-type"]').val();
        var startDate = $('#addEventModal input[name="task-start-date"]').val();
        var endDate = $('#addEventModal input[name="task-end-date"]').val();
        var taskDetails = $('#addEventModal textarea[name="task-details"]').val();
        var repeat = $('#addEventModal input[name="repeat"]').val();
        var daysToRepeat = $('#addEventModal label[name="selected-days"]').text();
        var classes = 'bg-info';

        switch (taskType) {
            case "general":
                classes = 'bg-primary';
                break;
            case "general-custom":
                classes = 'bg-info';
                break;
            case "api":
                classes = 'bg-warning';
                break;
            case "api-custom":
                classes = 'bg-danger';
                break;
        }
    });

    $("#generalTaskSelect").on('click', GeneralTaskActionSelect);
    $("#generalTaskSelect").on('change', GeneralTaskActionSelect);

    function GeneralTaskActionSelect() {
        $("#generalTaskSubmitBtn").attr('type', 'button');
        $('.general-task-function-key').text($('#generalTaskSelect :selected').text());
        $('#generalTaskResponseTextarea').text("");

        switch ($('#generalTaskSelect :selected').val()) {
            case '1':
                $("#generalTaskInput")[0].type = "Text";
                $("#generalTaskInput")[0].multiple = "";
                $("#generalTaskInput")[0].accept = "";
                $('#generalTaskInput').attr('placeholder', "Hi it's nice to meet you.");
                break;
            case '2':
                $("#generalTaskInput")[0].type = "File";
                $("#generalTaskInput")[0].multiple = "multiple";
                $("#generalTaskInput")[0].accept = ".doc,.docx,.txt,.xlsx,.csv";
                $('#generalTaskInput').attr('placeholder', "Select a the file you would like to view.");
                break;
            default:
                $('#generalTaskInput').attr('placeholder', 'Select a task key from the dropdown to the left.');
                break;
        }
    };

    $("#generalCustomTaskSelect").on('change', function () {
        $("#generalCustomTaskForm").attr('method', '');
        $("#generalCustomTaskForm").attr('target', '');
        $("#generalCustomTaskSubmitBtn").attr('type', 'button');
        $('#generalCustomTaskInput').val('');
        $("#generalCustomTaskInput").attr('name', '');
        $('#generalCustomFileAccordion').innerHTML = "";
        $('#generalCustomFileName')[0].accept = "";

        $('.general-custom-task-function-key').text($('#generalCustomTaskSelect :selected').text());

        switch ($('#generalCustomTaskSelect :selected').val()) {
            case '1':
                $("#generalCustomTaskSelectCrud")[0].disabled = false;
                $('#generalCustomTaskInput').attr('placeholder', 'Select an action for this Text file.');
                $('#generalCustomFileName')[0].accept = ".txt";
                break;
            case '2':
                $("#generalCustomTaskSelectCrud")[0].disabled = false;
                $('#generalCustomTaskInput').attr('placeholder', 'Select an action for this Excel file.');
                $('#generalCustomFileName')[0].accept = ".xlsx,.csv";
                break;
            case '3':
                $("#generalCustomTaskSelectCrud")[0].disabled = false;
                $('#generalCustomTaskInput').attr('placeholder', 'Select an action for this Word Document.');
                $('#generalCustomFileName')[0].accept = ".doc,.docx";
                break;
            default:
                $("#generalCustomTaskSelectCrud")[0].disabled = true;
                $('#generalCustomTaskInput').attr('placeholder', 'Select a file type from the dropdown above on the left.');
                $('#generalCustomFileName')[0].accept = "";
                break;
        }
    });

    $("#generalCustomTaskSelectCrud").on('change', function () {
        $("#generalCustomTaskForm").attr('method', '');
        $("#generalCustomTaskForm").attr('target', '');
        $("#generalCustomTaskSubmitBtn").attr('type', 'button');
        $('#generalCustomTaskInput').val('');
        $("#generalCustomTaskInput").attr('name', '');
        $("#custGenMessage")[0].innerHTML = '';
        $("#generalCustomFileAccordion")[0].innerHTML = "";
        $("#fileBox").addClass("visually-hidden");

        if ($('#generalCustomTaskSelect :selected')[0].index != 0) {
            let messageBox = $("#custGenMessage")[0];
            let autoOpenInput = $("#inlineCheckboxAutoOpen");
            let autoOpenInputLabel = $("label[for='inlineCheckboxAutoOpen'");
            let transferInput = $("#transferFileLocation");
            let transferInputLabel = $("label[for='transferFileLocation'");

            autoOpenFiles = 0;

            autoOpenInput.addClass("visually-hidden");
            autoOpenInputLabel.addClass("visually-hidden");
            transferInput.remove();
            transferInputLabel.remove();

            $('.general-custom-task-function-key').text($('#generalCustomTaskSelectCrud :selected').text() + " ~ " + $('#generalCustomTaskSelect :selected').text() + ":");

            switch ($('#generalCustomTaskSelectCrud :selected').val()) {
                case '1':
                    $('#generalCustomTaskInput').val(`This will create a new document for your WorkSpace.`);
                    break;
                case '2':
                    $('#generalCustomTaskInput').val(`This will take your selected file(s) and save it in your desired location.`);
                    let backupLocation = `
                            <label class="visually-hidden" for="transferFileLocation">Select a file location from the select</label>
                            <select class="form-select" id="transferFileLocation" required>
                                <option selected>Select a file location...</option>
                                <option value="1">Desktop</option>
                                <option value="2">Documents</option>
                                <option value="3">Downloads</option>
                                <option value="4">WorkSpace</option>
                            </select>
                    `;
                    $('#generalCustomTaskFormAdditions').append(backupLocation);
                    $("#custGenMessage")[0].innerText = "By clicking the test button you consent to us accessing your desired file location in order to copy your selected file to that location. This consent extends to your Transfer Documents testing and your schedualed automated Transfer Documents task(s)."
                    break;
                case '3':
                    $('#generalCustomTaskInput').val(`This loads the file(s) into a preview box for your "Daily Preview" list.`);
                    autoOpenInput.removeClass("visually-hidden");
                    autoOpenInputLabel.removeClass("visually-hidden");
                    break;
                case '4':
                    $('#generalCustomTaskInput').val(`This will take two files and format them into one.`);
                    break;
                case '5':
                    messageBox.innerHTML = `<p style="color:#2dddbd; font-weight:bolder; float:left">System Message: We recommend transfering your selected file(s) to a new location before deleting files from your WorkSpace</p>`;
                    $('#generalCustomTaskInput').val(`This will remove your selected file(s) from your WorkStation.`);
                    break;
                default:
                    $('#generalCustomTaskInput').val('Select what you would like to do to this file.');
                    break;
            }
        }
    });

    $("#inlineCheckboxAutoOpen").on('click', function () {
        autoOpenFiles = parseInt($(this)[0].value);
    });

    $("#generalTaskSubmitBtn").on('click', function () {
        switch ($('#generalTaskSelect :selected').val()) {
            case '1':
                var generalSelect = $('#generalTaskInput').val().replace(/[^a-zA-Z ]/g, "");
                if (generalSelect !== null && generalSelect !== "") {
                    $("#addGeneralTask")[0].disabled = false;
                    $('#generalTaskResponseTextarea').text(generalSelect);
                } else {
                    $('#generalTaskResponseTextarea').text("Please enter something for the AI to say.");
                }
                break;
            case '2':
                OpenFileCall($("#generalTaskInput")[0].files, "open");
                $("#generalTaskSubmitBtn")[0].disabled = true;
                break;
            default:
                $('#generalTaskResponseTextarea').text('Please select one of the Task Types from the dropdown.');
                break;
        }
    });

    $("#generalCusTaskTestBtn").on('click', function () {
        var fileLocation = $("#generalCustomFileName")[0].files;

        let messageBox = $("#custGenMessage")[0];
        let messageOpener = `<p style="color:red; font-weight:bolder;">`;
        let message = "";
        let messageCloser = "</p>";

        if ($("#generalCustomTaskTitle").val() === "" || $("#generalCustomTaskTitle").val() === " " || $("#generalCustomTaskTitle").val().length < 4) {
            message = "System Message: The Task Title is required and has to be at least 4 characters long.";
            messageBox.innerHTML = messageOpener + message + messageCloser;
            return;
        }

        var fileTypeSelect = Number.parseInt($("#generalCustomTaskSelect").val());
        if (Number.isNaN(fileTypeSelect)) {
            message = "System Message: The Task File Type is required.";
            messageBox.innerHTML = messageOpener + message + messageCloser;
            return;
        }

        var fileActionSelect = Number.parseInt($("#generalCustomTaskSelectCrud").val());
        if (Number.isNaN(fileActionSelect)) {
            message = "System Message: The File Action is required.";
            messageBox.innerHTML = messageOpener + message + messageCloser;
            return;
        }

        if ($("#generalCustomFileName").val() === "" || $("#generalCustomFileName").val() === " ") {
            message = "System Message: Please select a file or files.";
            messageBox.innerHTML = messageOpener + message + messageCloser;
            return;
        }

        if ($('#transferFileLocation :selected').val() !== null && $('#transferFileLocation :selected').val() !== undefined) {
            if (isNaN(parseInt($('#transferFileLocation :selected').val())) === true) {
                message = "System Message: Please select a file transfer location.";
                messageBox.innerHTML = messageOpener + message + messageCloser;
                return;
            }
        }

        if (parseInt(fileActionSelect) == 4 && fileLocation.length < 2) {
            message = "System Message: Extract Document Data you will need to select more than one file.";
            messageBox.innerHTML = messageOpener + message + messageCloser;
            return;
        } else if (parseInt(fileActionSelect) == 4 && fileLocation.length >= 2 && ($(".h-Selected-Data")[0].value == null || $(".h-Selected-Data")[0].value == "")) {
            message = "System Message: There is no data selected please reselect your files and select you desired Exraction Data Points.";
            messageBox.innerHTML = messageOpener + message + messageCloser;
            return;
        }

        var jFiles = [];
        var failedValues = null;
        var validFiles = false;
        var allowedExtensions = [
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/csv",
            "text/plain"
        ];

        if (fileLocation == null || fileLocation == "") {
            message = "System Message: Please select a file or files.";
            messageBox.innerHTML = messageOpener + message + messageCloser;
            return;
        }

        for (var i = 0; i < fileLocation.length; i++) {
            var fileName = "\\" + fileLocation[i].name;
            for (var a = 0; a < allowedExtensions.length; a++) {
                if (fileLocation[i].type.includes(allowedExtensions[a]) == true) {
                    if (failedValues == null || failedValues == "") {
                        jFiles.push(fileName);
                    }
                } else if (a == allowedExtensions.length - 1 && !jFiles.includes(fileName)) {
                    message = "The file(s) you have selected are not supported by our system. Please try another file in the Documents/Software Cake/WorkSpace folder.";
                    messageBox.innerHTML = messageOpener + message + messageCloser;
                    return;
                }
            }
        }

        if (tested == false) {
            validFiles = ValidateFiles(jFiles);
        }

        if (failedValues == null && validFiles !== false) {
            tested = true;
            if (parseInt(fileActionSelect) == 1 && fileLocation.length >= 2) {
                CreateFileCall("Combine-Documents", parseInt($("#generalCustomTaskSelect :selected")[0].index));
            }
            if (parseInt(fileActionSelect) == 2 && fileLocation.length > 0) {
                CreateFileCall("Transfer-Documents", parseInt($("#generalCustomTaskSelect :selected")[0].index));
            }
            if (parseInt(fileActionSelect) == 4 && fileLocation.length >= 2 && ($(".h-Selected-Data")[0].value !== null || $(".h-Selected-Data")[0].value !== "")) {
                CreateFileCall($(".h-Selected-Data")[0].value, parseInt($("#generalCustomTaskSelect :selected")[0].index));
            }
            if (parseInt(fileActionSelect) == 5 && fileLocation.length >= 2) {
                CreateFileCall("Delete-Documents", parseInt($("#generalCustomTaskSelect :selected")[0].index));
            }
            $("#generalCusTaskTestBtn")[0].disabled = true;
            $("#generalCustomFileSubmitBtn")[0].disabled = false;
        } else {
            message = "The file(s) you have selected are not accessable by our system. Please try another file located in the Documents/Software Cake/WorkSpace folder.";
        }

        messageBox.innerHTML = messageOpener + message + messageCloser;
    });

    $("#generalCustomFileSubmitBtn").on('click', function () {
        var selectedFileType = $("#generalCustomTaskSelect :selected")[0].index;
        var files = $('input[name="file-name"]').prop("files");
        var names = $.map(files, function (val) { return val.name; });
        var allowedExtensions = [
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/csv",
            "text/plain"
        ];

        var convertedType;
        switch (selectedFileType) {
            case 0:
                return;
                break;
            case 1:
                convertedType = ["text/plain"];
                break;
            case 2:
                convertedType = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
                break;
            case 3:
                convertedType = ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
                break;
            default:
                return;
                break;
        }

        if (convertedType.includes(files[0].type) == false) {
            return;
        }

        for (var a = 0; a < allowedExtensions.length; a++) {
            if (files[0].type.includes(allowedExtensions[a]) == false && a == allowedExtensions.length) {
                return;
            }
        }

        switch ($('#generalCustomTaskSelectCrud :selected')[0].index) {
            case 1:
                var vform = $('#__AjaxAntiForgeryForm');
                var token = $('input[name="__RequestVerificationToken"]', vform).val();

                $.ajax({
                    url: '/Profile/GeneralFileTask',
                    type: "POST",
                    data: {
                        __RequestVerificationToken: token,
                        usersTitle: $('#generalCustomTaskTitle').val(),
                        taskAction: $('#generalCustomTaskSelectCrud :selected')[0].index,
                        taskInput: names
                    }
                });
                break;
            case 2:
                var newLocation = $('#transferFileLocation :selected').val();

                if (isNaN(parseInt(newLocation)) === false && parseInt(newLocation) > 0) {
                    var vform = $('#__AjaxAntiForgeryForm');
                    var token = $('input[name="__RequestVerificationToken"]', vform).val();

                    $.ajax({
                        url: '/Profile/GeneralFileTask',
                        type: "POST",
                        data: {
                            __RequestVerificationToken: token,
                            usersTitle: $('#generalCustomTaskTitle').val(),
                            taskAction: $('#generalCustomTaskSelectCrud :selected')[0].index,
                            taskInput: names,
                            additonFileInfo: newLocation
                        }
                    });
                }
                break;
            case 3:
                var vform = $('#__AjaxAntiForgeryForm');
                var token = $('input[name="__RequestVerificationToken"]', vform).val();

                $.ajax({
                    url: '/Profile/GeneralFileTask',
                    type: "POST",
                    data: {
                        __RequestVerificationToken: token,
                        usersTitle: $('#generalCustomTaskTitle').val(),
                        taskAction: $('#generalCustomTaskSelectCrud :selected')[0].index,
                        taskInput: names,
                        additonFileInfo: autoOpenFiles
                    }
                });
                break;
            case 4:
                var vform = $('#__AjaxAntiForgeryForm');
                var token = $('input[name="__RequestVerificationToken"]', vform).val();

                $.ajax({
                    url: '/Profile/GeneralFileTask',
                    type: "POST",
                    data: {
                        __RequestVerificationToken: token,
                        usersTitle: $('#generalCustomTaskTitle').val(),
                        taskAction: $('#generalCustomTaskSelectCrud :selected')[0].index,
                        taskInput: names,
                        additonFileInfo: selectedFileType,
                        additonFileDataInfo: $(".h-Selected-Data")[0].value
                    }
                });
                break;
            case 5:
                var vform = $('#__AjaxAntiForgeryForm');
                var token = $('input[name="__RequestVerificationToken"]', vform).val();

                $.ajax({
                    url: '/Profile/GeneralFileTask',
                    type: "POST",
                    data: {
                        __RequestVerificationToken: token,
                        usersTitle: $('#generalCustomTaskTitle').val(),
                        taskAction: $('#generalCustomTaskSelectCrud :selected')[0].index,
                        taskInput: names
                    }
                });
                break;
            default:
                break;
        }
        $("#addNewCustGeneralTask").modal('hide');
    });

    $(".subBtn").mousedown(function () {
        var titleCheck = false;
        var typeCheck = false;
        var typeCompleteCheck = false;
        var discriptionCheck = false;
        var repeatCheck = false;
        $("#errorMessage")[0].innerText = "";

        if ($("#newTaskMainTitle")[0].value !== "" && $("#newTaskMainTitle")[0].value !== null) {
            titleCheck = true;
        } else {
            $("#errorMessage")[0].innerText += "\nPlease Enter a Title.";
        }

        if ($("#newTaskMainTaskType :selected")[0].index > 0) {
            typeCheck = true;
        } else {
            $("#errorMessage")[0].innerText += "\nPlease Select a Task Type.";
        }

        if ($('p[name="TaskDetails"]')[0].innerText !== "" && $('p[name="TaskDetails"]')[0].innerText !== null && $('p[name="TaskDetails"]')[0].innerText !== "Task setup results...") {
            typeCompleteCheck = true;
        } else {
            $("#errorMessage")[0].innerText += "\nPlease fill out and Save the Task Type Form.";
        }

        if ($("#mainJobDetails")[0].value !== "" && $("#newTaskMainTitle")[0].value !== null) {
            discriptionCheck = true;
        } else {
            $("#errorMessage")[0].innerText += "\nPlease add a short discription.";
        }

        if ($(".repeat-input")[0].value !== "" && $(".repeat-input")[0].value !== null) {
            switch ($(".repeat-input")[0].value) {
                case "No Repeat":
                case "Daily":
                    repeatCheck = true;
                    break;
                case "Weekly":
                    if ($(".neumorphic-checkbox_active").length > 0) {
                        repeatCheck = true;
                    }
                    break;
                case "Monthly":
                    if ($(".task-start-date").length > 0) {
                        $(".task-start-date")[0].setAttribute("required", "required");
                        repeatCheck = true;
                    }
                    break;
                case "Yearly":
                    if ($(".task-date").length > 0) {
                        $(".task-date")[0].setAttribute("required", "required");
                        repeatCheck = true;
                    }
                    break;
                default:
                    if ($(".subBtn")[0] != null) {
                        $(".subBtn")[0].type = "Button";
                    }
                    break;
            }
        }
        else {
            $("#errorMessage")[0].innerText += "\nPlease Select a Repeat Type.";
        }

        if (titleCheck == true && typeCheck == true && discriptionCheck == true && repeatCheck == true && typeCompleteCheck == true) {
            $(".subBtn")[0].type = "Submit";
        }
    });
});

$('input[name="file-name"]').on('change', function () {
    var selectedFileType = $("#generalCustomTaskSelect :selected")[0].index;
    var selectedAction = $('#generalCustomTaskSelectCrud :selected').val();
    var files = $('input[name="file-name"]').prop("files");
    var names = $.map(files, function (val) { return val.name; });
    var accordiandiv = $('#generalCustomFileAccordion');
    var responceArea = $('#generalCustomTaskResponseTextarea');
    var documentContent;

    responceArea.text("I have loaded the files into the file previewer. Please review the files before submitting this task.");
    $('#generalCustomFileAccordion')[0].innerHTML = "";

    for (var i = 0; i <= names.length - 1; i++) {
        var strippedName = names[i].replace(/[^A-Za-z]+/g, '');
        var allowedExtensions = [
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/csv",
            "text/plain"
        ];
        var listOfFiles = [];
        var filePreviews = "";
        var accordianhtml = "";
        var accordianErrorHtml = "";
        var convertedType;

        switch (selectedFileType) {
            case 0:
                return;
                break;
            case 1:
                convertedType = ["text/plain"];
                break;
            case 2:
                convertedType = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
                break;
            case 3:
                convertedType = ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
                break;
            default:
                return;
                break;
        }

        for (var i = 0; i < files.length; i++) {
            for (var a = 0; a < allowedExtensions.length; a++) {
                if (files[0].type.includes(allowedExtensions[a]) == true) {
                    if (convertedType.includes(files[0].type) == true) {
                        if (selectedAction == 5) {
                            accordianhtml = `<div class="accordion-item${i}">
                                        <h2 class="accordion-header" id="accordion-heading${i}">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${strippedName}-${i}" aria-expanded="false" aria-controls="flush-collapse${i}">
                                                - SVG
                                                <p style="padding-top: 15px; padding-left: 15px;">${names[i]}</p>
                                            </button>
                                        </h2>
                                        </div>`;
                        } else {
                            accordianhtml = `<div class="accordion-item${i}">
                                        <h2 class="accordion-header" id="accordion-heading${i}">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${strippedName}-${i}" aria-expanded="false" aria-controls="flush-collapse${i}">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
                                                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z"/>
                                                </svg>
                                                <p style="padding-top: 15px; padding-left: 15px;">${names[i]}</p>
                                            </button>
                                        </h2>
                                        </div>`;
                        }
                        listOfFiles.push(names[i]);
                        filePreviews += accordianhtml;
                    } else {
                        accordianErrorHtml = `<div class="accordion-item${i}">
                                <h2 class="accordion-header" id="accordion-heading${i}">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${strippedName}-${i}" aria-expanded="false" aria-controls="flush-collapse${i}">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-file-earmark-excel-fill" viewBox="0 0 16 16">
                                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM5.884 6.68 8 9.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 10l2.233 2.68a.5.5 0 0 1-.768.64L8 10.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 10 5.116 7.32a.5.5 0 1 1 .768-.64z"/>
                                        </svg>
                                        <p style="padding-top: 15px; padding-left: 15px;"><b>Invalid File Match</b>: ${names[i]} is not of the same file type that you selected. <b style='color:red'>File Skipped</b>.</p>
                                    </button>
                                </h2>
                                </div>`;
                        filePreviews += accordianErrorHtml;
                    }
                } else if (a == allowedExtensions.length - 1 && !listOfFiles.includes(names[i])) {
                    accordianErrorHtml = `<div class="accordion-item${i}">
                                <h2 class="accordion-header" id="accordion-heading${i}">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${strippedName}-${i}" aria-expanded="false" aria-controls="flush-collapse${i}">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-file-earmark-excel-fill" viewBox="0 0 16 16">
                                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM5.884 6.68 8 9.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 10l2.233 2.68a.5.5 0 0 1-.768.64L8 10.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 10 5.116 7.32a.5.5 0 1 1 .768-.64z"/>
                                        </svg>
                                        <p style="padding-top: 15px; padding-left: 15px;"><b>Invalid File Match</b>: ${names[i]} is not of the same file type that you selected. <b style='color:red'>File Skipped</b>.</p>
                                    </button>
                                </h2>
                                </div>`;
                    filePreviews += accordianErrorHtml;
                }
            }
        }
        accordiandiv.append(filePreviews);
    }
});

$('select[name="edit-task-type"]').on(
    'change', function () {
        var taskType = this.value;
        taskStatus = "edit";

        switch (taskType) {
            case "existing":
                break;
            case "general":
                $('#taskEditModal').modal('hide');
                $("#generalTaskSubmitBtn").attr('type', 'button');
                $("#addNewGeneralTask").modal('show');
                break;
            case "general-custom":

                break;
            case "api":

                break;
            case "api-custom":

                break;
        }
    }
);

$('select[name="TaskType"]').on(
    'change', function () {
        var taskType = this.selectedIndex;
        taskStatus = "add";

        switch (taskType) {
            //case 1:
            //    // Existing
            //    $('#existingTaskModal').modal('hide');
            //    $("#generalTaskSubmitBtn").attr('type', 'button');
            //    $('#generalTaskInput').val('');
            //    $("#existingTaskModal").modal('show');
            //    break;
            case 1:
                $('#addTaskModal').modal('hide');
                $("#generalTaskSubmitBtn").attr('type', 'button');
                $('#generalTaskInput').val('');
                $("#addNewGeneralTask").modal('show');
                break;
            case 2:
                $('#addNewCustGeneralTask').modal('hide');
                $("#generalCustTaskSubmitBtn").attr('type', 'button');
                $('#generalCustomTaskInput').val('');
                $("#addNewCustGeneralTask").modal('show');
                break;
            //case 4:
            //    // Widget
            //    break;
            //case 5:
            //    $('#addNewAPITask').modal('hide');
            //    $("#generalApiTaskSubmitBtn").attr('type', 'button');
            //    $('#generalCustomTaskInput').val('');
            //    $("#addNewAPITask").modal('show');
            //    break;
        }
    }
);

$('#generalTaskInput').on(
    'keydown', function () {
        $("#addGeneralTask")[0].disabled = true;
    }
);

$('#generalTaskInput').on(
    'change', function () {
        $("#addGeneralTask")[0].disabled = true;
    }
);

$('#generalCustomTaskSelect').on(
    'change', function () {
        tested = false;
        $("#generalCustomFileName").val("");
        $("#generalCusTaskTestBtn")[0].disabled = false;
        $("#generalCustomFileSubmitBtn")[0].disabled = true;
        $("#custGenMessage")[0].innerHTML = null;
        $("#v-pills-tab")[0].innerHTML = null;
        $("#v-pills-tabContent")[0].innerHTML = null;
    }
);

$('#generalCustomTaskSelectCrud').on(
    'change', function () {
        tested = false;
        $("#generalCustomFileName").val("");
        $("#generalCusTaskTestBtn")[0].disabled = false;
        $("#generalCustomFileSubmitBtn")[0].disabled = true;
        $("#custGenMessage")[0].innerHTML = null;
        $("#v-pills-tab")[0].innerHTML = null;
        $("#v-pills-tabContent")[0].innerHTML = null;
    }
);

$('#generalCustomFileName').on(
    'change', function () {
        $("#custGenMessage")[0].innerHTML = null;
        $("#generalCusTaskTestBtn")[0].disabled = false;
        $("#generalCustomFileSubmitBtn")[0].disabled = true;
        $("#v-pills-tab")[0].innerHTML = null;
        $("#v-pills-tabContent")[0].innerHTML = null;
        $(".h-Selected-Data")[0].value = null;

        var files = $("#generalCustomFileName")[0].files;
        var fileCount = $("#generalCustomFileName")[0].files.length;
        var taskType = $('#generalCustomTaskSelectCrud :selected').val();

        let messageBox = $("#custGenMessage")[0];
        let messageOpener = `<p style="color:red; font-weight:bolder;">`;
        let message = "";
        let messageCloser = "</p>";

        tested = false;

        if (taskType == 1 || taskType == 4) {
            var jFiles = [];
            var failedValues = null;
            var allowedExtensions = [
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "text/csv",
                "text/plain"
            ];

            if (files == null || files == "" || fileCount <= 0) {
                message = "Please select a document to" + action + ".";
                messageBox.innerHTML = messageOpener + message + messageCloser;
                return;
            }

            if (fileCount < 2) {
                message = "Please select more than one file.";
                messageBox.innerHTML = messageOpener + message + messageCloser;
                return;
            }

            for (var i = 0; i < fileCount; i++) {
                var fileName = "\\" + files[i].name;
                for (var a = 0; a < allowedExtensions.length; a++) {
                    if (files[i].type.includes(allowedExtensions[a]) == true) {
                        if (failedValues == null || failedValues == "") {
                            jFiles.push(fileName);
                        }
                    } else if (a == allowedExtensions.length - 1 && !jFiles.includes(fileName)) {
                        message = "The file(s) you have selected are not supported by our system. Please try another format.";
                        messageBox.innerHTML = messageOpener + message + messageCloser;
                        return;
                    }
                }
            }

            if (failedValues == null) {
                if (taskType == 4) {
                    $("#fileBox").removeClass("visually-hidden");
                    $("#currentFileTitle").click();
                }

                var fileNames = {};
                for (var i = 0; i < fileCount; i++) {
                    fileNames[i] = "\\" + files[i].name;
                }

                var vform = $('#__AjaxAntiForgeryForm');
                var token = $('input[name="__RequestVerificationToken"]', vform).val();

                $.ajax({
                    url: '/Profile/CallFileMana',
                    type: "POST",
                    data: {
                        __RequestVerificationToken: token,
                        function: "view",
                        jsFiles: fileNames
                    }
                }).done(function (result) {
                    if (result != null) {
                        switch (parseInt(taskType)) {
                            case 4:
                                var cleanedResult = SanitizeResponse(result);
                                let titleSection = $("#fileSelectButtons");
                                titleSection[0].innerHTML = "";

                                if (cleanedResult.textFiles != null && IsNumeric(cleanedResult.textFiles.length) && cleanedResult.textFiles.length > 0) {
                                    for (let textCount = 0; textCount < cleanedResult.textFiles.length; textCount++) {
                                        let titleID = cleanedResult.textFiles[textCount].title.toString().replaceAll(' ', '').replace('.', '');
                                        let title = cleanedResult.textFiles[textCount].title.toString();
                                        let keys = TurntoArrayString(Object.keys(cleanedResult.textFiles[textCount]));
                                        let values = TurntoArrayString(Object.values(cleanedResult.textFiles[textCount]));

                                        let titleButtonBaseOpener = `<div class="m-2"><button class="oval-lg n-inputs w-auto" id="fileButton-${titleID}" onclick="FileButtonClick('${titleID}','${title}',${keys},${values})"><span>`;
                                        let titleButtonBaseCloser = `</span></button></div>`;

                                        if (title != "" && title != null && title.length > 0) {
                                            titleSection[0].innerHTML += titleButtonBaseOpener + title + titleButtonBaseCloser;
                                            if (textCount === 0) {
                                                firstItem = title;
                                            }
                                        }
                                    }
                                }

                                if (cleanedResult.excelFiles != null && IsNumeric(cleanedResult.excelFiles.length) && cleanedResult.excelFiles.length > 0) {
                                    let titleButtonBaseOpener;
                                    let titleButtonBaseCloser;

                                    for (let excelCount = 0; excelCount < cleanedResult.excelFiles.length; excelCount++) {
                                        let titleID = cleanedResult.excelFiles[excelCount].title.toString().replaceAll(" ", '').replace('.', '');
                                        let title = cleanedResult.excelFiles[excelCount].title.toString();
                                        let pagesArray = cleanedResult.excelFiles[excelCount].pages;
                                        let columnsArray = cleanedResult.excelFiles[excelCount].columns;
                                        let rowsArray = cleanedResult.excelFiles[excelCount].rows;
                                        let dataArray = cleanedResult.excelFiles[excelCount].data;
                                        let currentExcelColumns = [];
                                        let currentExcelRows = [];
                                        let currentExcelData = [];
                                        let currentExcelPages = [];

                                        // Need to loop through pages and thier column data
                                        pagesArray.forEach(page => {
                                            let currentIndex = pagesArray.indexOf(page);
                                            if (pagesArray[currentIndex] == null || pagesArray[currentIndex] == '') {
                                                currentExcelPages.push("No Data");
                                            } else {
                                                currentExcelPages.push(ReString(pagesArray[currentIndex]));
                                            }

                                            if (columnsArray[currentIndex] == null || columnsArray[currentIndex] == '') {
                                                currentExcelColumns.push("No Data");
                                            } else {
                                                currentExcelColumns.push(TurntoArrayString(columnsArray[currentIndex]));
                                            }

                                            if (rowsArray[currentIndex] == null || rowsArray[currentIndex] == '') {
                                                currentExcelRows.push("No Data");
                                            } else {
                                                currentExcelRows.push(TurntoArrayString(rowsArray[currentIndex]));
                                            }

                                            if (dataArray[currentIndex] == null || dataArray[currentIndex] == '') {
                                                currentExcelData.push("No Data");
                                            } else {
                                                currentExcelData.push(TurntoArrayString(dataArray[currentIndex]));
                                            }
                                        });
                                        var cleanPages = currentExcelPages.join('⁝').replaceAll("'", '').replaceAll(/(\r\n|\n|\r)/gm, '');
                                        var cleanColumns = currentExcelColumns.join('⁝').replaceAll("'", '').replaceAll(/(\r\n|\n|\r)/gm, '');
                                        var cleanRows = currentExcelRows.join('⁝').replaceAll("'", '').replaceAll(/(\r\n|\n|\r)/gm, '');
                                        var cleanData = currentExcelData.join('⁝').replaceAll("'", '').replaceAll(/(\r\n|\n|\r)/gm, '');

                                        titleButtonBaseOpener = `<div class="m-2"><button class="oval-lg n-inputs w-auto" id="fileButton-${titleID}" onclick="ExcelFileButtonClick('${titleID}','${title}','${cleanPages}','${cleanColumns}','${cleanRows}','${cleanData}')"><span>`;
                                        titleButtonBaseCloser = `</span></button></div>`;

                                        if (title != "" && title != null && title.length > 0) {
                                            titleSection[0].innerHTML += titleButtonBaseOpener + title + titleButtonBaseCloser;
                                        }
                                    }
                                }

                                if (cleanedResult.wordFiles != null && IsNumeric(cleanedResult.wordFiles.length) && cleanedResult.wordFiles.length > 0) {
                                    for (let wordCount = 0; wordCount < cleanedResult.wordFiles.length; wordCount++) {
                                        let titleID = cleanedResult.wordFiles[wordCount].title.toString().replaceAll(' ', '').replace('.', '');
                                        let title = cleanedResult.wordFiles[wordCount].title.toString();
                                        let keys = TurntoArrayString(Object.keys(cleanedResult.wordFiles[wordCount]));
                                        let values = Object.values(cleanedResult.wordFiles[wordCount]);
                                        let titleButtonBaseOpener = `<div class="m-2"><button class="oval-lg n-inputs w-auto" id="fileButton-${titleID}" onclick="WordFileButtonClick('${titleID}','${title}',${keys},'${values}')"><span>`;
                                        let titleButtonBaseCloser = `</span></button></div>`;

                                        if (title != "" && title != null && title.length > 0) {
                                            titleSection[0].innerHTML += titleButtonBaseOpener + title + titleButtonBaseCloser;
                                            if (wordCount === 0) {
                                                firstItem = title;
                                            }
                                        }
                                    }
                                }
                                break;
                        }
                    }
                });
            }
        }
    }
);

$("#generalTaskSelect").on('change', function () {
    $("#generalTaskSubmitBtn")[0].disabled = false;
});
$("#generalTaskInput").on('change', function () {
    $("#generalTaskSubmitBtn")[0].disabled = false;
});

$("#addGeneralTask").click(function (event) {
    var generalTaskFunctionName = $('#generalTaskSelect').find(":selected").text();
    var generalTaskParameters = $("#addNewGeneralTask").find('#generalTaskInput').val();
    var taskTitle = $("#generalTaskTitle")[0].value.trim().replace(/[^a-zA-Z ]/g, "");
    var taskInput = $("#generalTaskInput")[0].value.trim();
    var taskTypeVal = $('#generalTaskSelect').find(":selected").val().trim();

    switch (taskStatus) {
        case "add":
            if (taskTitle !== null && taskTitle !== "") {
                if (taskTypeVal !== null && taskTypeVal !== "") {
                    if (taskInput !== null && taskInput !== "") {
                        var vform = $('#__AjaxAntiForgeryForm');
                        var token = $('input[name="__RequestVerificationToken"]', vform).val();

                        event.preventDefault();
                        $.ajax({
                            url: '/Profile/GeneralTask',
                            type: "POST",
                            data: {
                                __RequestVerificationToken: token,
                                generalTaskTitle: taskTitle.replace(/[^a-zA-Z ]/g, ""),
                                generalTaskSelect: taskTypeVal,
                                taskInput: taskInput
                            }
                        });

                        var taskDataInfoType = `Task Type: ${generalTaskFunctionName}`;
                        var taskDataInfoAction = `Task Action: ${generalTaskParameters}`;

                        $('p[name="TaskDetails"]')[0].innerText = taskDataInfoType.replace(/[^a-zA-Z ]/g, "") + '\n' + taskDataInfoAction;
                        $('input[name="TaskDetailVal"]')[0].value = taskDataInfoType + ' ' + taskDataInfoAction;
                        $("#addNewGeneralTask").modal('hide');
                    } else {
                        switch (parseInt(taskTypeVal)) {
                            case 1:
                                $('textarea[name="generalTaskResponseTextarea"]').text("Please Enter what you want the AI to say");
                                break;
                            case 2:
                                $('textarea[name="generalTaskResponseTextarea"]').text("Please Enter a Website URL");
                                break;
                        }
                    }
                } else {
                    $('textarea[name="generalTaskResponseTextarea"]').text("Please Select a Task Type");
                }
            } else {
                $('textarea[name="generalTaskResponseTextarea"]').text("Please Enter a Task Title");
            }
            break;
        case "edit":
            $('#taskEditModal textarea[name="edit-task-details"]').val(taskData);
            $("#addNewGeneralTask").modal('hide');
            $('#taskEditModal').modal('show');
            break;
    }
});

$("#existingTaskSelect").on(
    'change', function () {
        var taskTitle = this.value;
        var vform = $('#__AjaxAntiForgeryForm');
        var token = $('input[name="__RequestVerificationToken"]', vform).val();

        $.ajax({
            url: '/Profile/TaskExists',
            type: "GET",
            data: {
                __RequestVerificationToken: token,
                taskTitle: taskTitle
            }
        }).done(function (res) {
            const taskType = res[0].taskTypeID + 1;
            const taskContent = res[0].taskContent;
            $(".exiting-task").removeClass("hidden");
            $(`.exist-type-select option:eq("${taskType}")`).prop('selected', true);
            $(".existing-task-content")[0].value = taskContent;
        });
    }
);

$(".save-exist").on(
    'click', function () {
        var vform = $('#__AjaxAntiForgeryForm');
        var token = $('input[name="__RequestVerificationToken"]', vform).val();

        var taskTitle = $('#existingTaskSelect').find(":selected").val().trim();
        var selectedTaskDetails = $(".existing-task-content")[0].value;
        var taskDetails = $('p[name="TaskDetails"]');
        var innerTaskDetail = $('input[name="TaskDetailVal"]');
        $.ajax({
            url: '/Profile/UseExistingTask',
            type: "POST",
            data: {
                __RequestVerificationToken: token,
                taskTitle: taskTitle
            }
        });
        taskDetails[0].innerText = selectedTaskDetails;
        innerTaskDetail[0].value = selectedTaskDetails;
        $("#existingTaskModal").modal('hide');
    }
);

$("#submitDataSelectionBtn").on(
    'click', function () {
        let messageBox = $("#extractionMessage")[0];
        let messageOpener = `<p style="color:red; font-weight:bolder;">`;
        let message = "";
        let messageCloser = "</p>";
        var taskContent = "";

        const fileContent = document.querySelector("#v-pills-tabContent");
        var activeElements = fileContent.querySelectorAll("p");
        var activeExcelElements = fileContent.querySelectorAll("td>input[type='checkbox']:checked");

        if (activeElements.length > 0) {
            for (var count = 0; count < activeElements.length; count++) {
                var title = activeElements[count].title;
                var content = activeElements[count].innerText;
                taskContent += title + "…" + content + "⁝";
            }

            if (taskContent !== null && taskContent !== "") {
                $(".h-Selected-Data")[0].value = taskContent;
                $("#fileBox").addClass("visually-hidden");
            } else {
                message = "System Message: Please select the data point(s) you want to extract.";
            }
        } else if (activeElements.length === 0 && activeExcelElements.length > 0) {
            if ($(".h-Selected-Data")[0].value !== "" && $(".h-Selected-Data")[0].value !== null) {
                var excelFileButtons = document.querySelectorAll("button[class$='selected-excel-file']");
                var currentPage = $("#titleIDP")[0].value;
                var displayhLocationValue = $(".h-Selected-Data")[0].value;
                var selectedExcelFileButton = "";
                var selectedPageDataPoint = [];
                var excelDataPointList = displayhLocationValue === "" || displayhLocationValue === null ? "" : JSON.parse($(".h-Selected-Data")[0].value);
                var previouslySelectedPage = sessionStorage.getItem('excelPreviousPage');
                var fileFound = false;

                if (previouslySelectedPage == null) {
                    sessionStorage.setItem('excelPreviousPage', currentPage);
                }

                if (excelFileButtons.length > 0) {
                    selectedExcelFileButton = excelFileButtons[0].id;
                }

                var selected = document.querySelectorAll("td>input[type='checkbox']:checked");

                if (selected.length > 0) {
                    selected.forEach(select => {
                        var dataPointCell = select.name;
                        var dataPointValue = select.value;
                        selectedPageDataPoint.push(dataPointCell + '⁝' + dataPointValue);
                    });

                    for (var ei = 0; ei < excelDataPointList?.length; ei++) {
                        if (excelDataPointList[ei].hasOwnProperty("file") && excelDataPointList[ei].file === selectedExcelFileButton) {
                            if (excelDataPointList[ei].hasOwnProperty("page") && excelDataPointList[ei].page === previouslySelectedPage) {
                                fileFound = true;
                                excelDataPointList[ei].datapoints = selectedPageDataPoint;
                            }
                        }
                    }

                    if (fileFound == false && selectedPageDataPoint.length > 0 && currentPage != "" && currentPage != null) {
                        var selectedPage = previouslySelectedPage == null ? currentPage : previouslySelectedPage;

                        var newFileObject = {
                            file: selectedExcelFileButton,
                            page: selectedPage,
                            datapoints: selectedPageDataPoint
                        }

                        if (excelDataPointList == null || excelDataPointList == "") {
                            excelDataPointList = [newFileObject];
                        } else {
                            excelDataPointList.push(newFileObject);
                        }
                    }
                    sessionStorage.setItem('excelPreviousPage', currentPage);
                    $(".h-Selected-Data")[0].value = JSON.stringify(excelDataPointList);
                }

                $("#fileBox").addClass("visually-hidden");
            } else {
                message = "System Message: Please select the categories or rows you would like to get your data point(s) from.";
            }
        } else {
            message = "System Message: Please select the file(s) you would like to get your data point(s) from.";
        }
        messageBox.innerHTML = messageOpener + message + messageCloser;
    }
);

$("#closeDataSelectionBtn").on(
    'click', function () {
        $("#fileSelectButtons")[0].innerHTML = null;
        $("#v-pills-tab")[0].innerHTML = null;
        $("#v-pills-tabContent")[0].innerHTML = null;
        $("#extractionMessage")[0], innerHTML = null;
        $("#v-pills-tab")[0].innerHTML = null;
        $("#v-pills-tabContent")[0].innerHTML = null;
        $("#generalCustomFileName")[0].value = null;

        $("#clearPageDataSelectionBtn").addClass("visually-hidden");
        $("#clearAllDataSelectionBtn").addClass("visually-hidden");
        $("#fileBox").addClass("visually-hidden");
    }
);

function UpdateAssignedTask(aiAssignedTask) {
    var vform = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', vform).val();

    taskData = $.ajax({
        url: '/Profile/UpdateAiTasks',
        type: "POST",
        data: {
            __RequestVerificationToken: token,
            aiTask: aiAssignedTask
        },
        error: console.log("Error 500")
    });
}

function generateRandomSearchWord() {
    // Returns a random integer from 0 to 100:
    var ranNum = Math.floor(Math.random() * 101);
    const words = [];
    words.push(
        "brass", "cute", "bed", "laborer",
        "obnoxious", "sleet", "fragile", "threatening",
        "cat", "look", "bang", "half",
        "strange", "eggs", "actor", "want",
        "deceive", "hop", "tense", "snotty",
        "spoon", "pause", "regret", "discover",
        "cold", "debt", "polite", "mass",
        "annoyed", "fish", "hulking", "flimsy",
        "rose", "rebel", "wretched", "frequent",
        "heady", "desire", "children", "celery",
        "file", "wing", "reduce", "worthless",
        "violent", "plucky", "mask", "cactus",
        "popcorn", "stem", "blue", "war",
        "fowl", "prickly", "judge", "empty",
        "quack", "untidy", "creature", "songs",
        "blue-eyed", "tense", "highfalutin", "rapid",
        "please", "faithful", "coach", "rob",
        "irritate", "gullible", "tame", "merciful",
        "somber", "mean", "vagabond", "snatch",
        "hesitant", "improve", "travel", "vast",
        "gleaming", "itch", "protect", "deep",
        "air", "science", "wheel", "big",
        "fold", "downtown", "error", "half",
        "lick", "neighborly", "jellyfish", "wholesale",
        "majestic", "art", "excited", "value"
    );
    $('#generalTaskInput').attr('placeholder', words[ranNum]);
}

function processExcelPreview(tableArr, strippedName, fileIndex) {
    let table = document.createElement('table');
    table.classList.add('accordion-body');
    table.classList.add('table');
    table.classList.add('table-striped');
    for (let row of tableArr) {
        table.insertRow();
        for (let cell of row) {
            let newCell = table.rows[table.rows.length - 1].insertCell();
            newCell.textContent = cell;
        }
    }
    table.innerHTML += `<caption>${strippedName} Table Preview</caption>`;
    $(`#flush-collapse-${strippedName}-${fileIndex}`).append(table);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser. Your location is being used for ");
    }
}

function ValidateFiles(files) {
    if (files !== null || files !== "") {
        var vform = $('#__AjaxAntiForgeryForm');
        var token = $('input[name="__RequestVerificationToken"]', vform).val();

        var validFiles = $.ajax({
            url: '/Profile/ValidateFilesCall',
            type: "POST",
            async: false,
            data: {
                __RequestVerificationToken: token,
                function: "test",
                jsFiles: files
            },
            error: function () {
                return false
            }
        });
        return validFiles.responseJSON
    }
}

function OpenFileCall(fileLocation, action) {
    var jFiles = [];
    var failedValues = null;
    var vform = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', vform).val();

    var allowedExtensions = [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
        "text/plain"
    ];
    var responseBox = $('#generalTaskResponseTextarea');

    if (fileLocation == null || fileLocation == "") {
        responseBox.text("Please select a document to" + action + ".");
        return;
    }

    for (var i = 0; i < fileLocation.length; i++) {
        var fileName = "\\" + fileLocation[i].name;

        for (var a = 0; a < allowedExtensions.length; a++) {
            if (fileLocation[i].type.includes(allowedExtensions[a]) == true) {
                if (failedValues == null || failedValues == "") {
                    jFiles.push(fileName);
                }
            } else if (a == allowedExtensions.length - 1 && !jFiles.includes(fileName)) {
                responseBox.text("The file(s) you have selected are not supported by our system. Please try another format.");
                return;
            }
        }
    }

    if (failedValues == null) {
        var vform = $('#__AjaxAntiForgeryForm');
        var token = $('input[name="__RequestVerificationToken"]', vform).val();

        $.ajax({
            url: '/Profile/CallFileMana',
            type: "POST",
            data: {
                __RequestVerificationToken: token,
                function: "open",
                jsFiles: jFiles
            },
            success: function () {
                responseBox.text("Starting Task - Open Files.");
            },
            error: function () {
                responseBox.text("File(s) have failed to open. Please try again and if this error persists please contact customer service.");
            }
        }).done(function (res) {
            if (res !== null && res !== undefined && res !== "") {
                responseBox.text("Successfully Executed Task - Open Files.");
                $("#addGeneralTask")[0].disabled = false;
            } else {
                responseBox.text("Failed to locate or process selected file(s) in your Software Cake/Workspace folder. Please make sure your selected file(s) are in your Software Cake/Workspace folder. If you do not have this folder, please go to the File Manager page, Click the 'Download Manager' button and add your desired files there.");
            }
        });
    }
}

function CreateFileCall(fileDefinition, fileType) {
    var jFiles = [];
    var failedValues = null;
    const title = $("#generalCustomTaskTitle")[0].value;
    let messageBox = $("#custGenMessage")[0];
    let messageOpener = `<p style="color:red; font-weight:bolder;">`;
    let message = "";
    let messageCloser = "</p>";
    var allowedExtensions = [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
        "text/plain"
    ];

    if (fileDefinition == null || fileDefinition == "" || fileType == null || Number.isNaN(fileType) || !IsNumeric(fileType)) {
        message = "Please select try again.";
        messageBox.innerHTML = messageOpener + message + messageCloser;
        return;
    }

    var vform = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', vform).val();
    var fileLocation = $("#generalCustomFileName")[0].files;

    if (fileLocation == null || fileLocation == "") {
        message = "Please try again.";
        messageBox.innerHTML = messageOpener + message + messageCloser;
        return;
    }

    for (var i = 0; i < fileLocation.length; i++) {
        var fileName = "\\" + fileLocation[i].name;

        for (var a = 0; a < allowedExtensions.length; a++) {
            if (fileLocation[i].type.includes(allowedExtensions[a]) == true) {
                if (failedValues == null || failedValues == "") {
                    jFiles.push(fileName);
                }
            } else if (a == allowedExtensions.length - 1 && !jFiles.includes(fileName)) {
                message = "The file(s) you have selected are not supported by our system. Please try another format.";
                messageBox.innerHTML = messageOpener + message + messageCloser;
                return;
            }
        }
    }

    if ($("#transferFileLocation").length > 0 && $("#transferFileLocation")[0].selectedIndex > 0) {
        switch ($("#transferFileLocation")[0].selectedIndex) {
            case 1:
                jFiles.push("\\Desktop");
                break;
            case 2:
                jFiles.push("\\Documents");
                break;
            case 3:
                jFiles.push("\\Downloads");
                break;
            case 4:
                jFiles.push("\\WorkSpace");
                break;
        }
    }

    if (failedValues == null) {
        try {
            $.ajax({
                url: '/Profile/CallFileMana',
                type: "POST",
                data: {
                    __RequestVerificationToken: token,
                    function: "create",
                    selectedFolder: title,
                    jsFiles: jFiles,
                    fileData: fileDefinition,
                    fType: fileType
                }
            }).done(function (res) {
                messsage = "Failed to run process. Please contact customer support if this continues.";
                switch (fileType) {
                    case 1:
                        if (res.textFiles != null) {
                            message = "Executed Task - ";
                            if (parseInt(res.textFiles[0].paragraphs) == 200) {
                                message += "Executed Task was Successful.";
                            } else {
                                message += "Task Failed - Please try again - Request Resetting.";
                            }
                        }
                        break;
                    case 2:
                        if (res.excelFiles != null) {
                            message = "Executed Task - ";
                            if (parseInt(res.excelFiles[0].paragraphs) == 200) {
                                message += "Executed Task was Successful.";
                            } else {
                                message += "Task Failed - Please try again - Request Resetting.";
                            }
                        }
                        break;
                    case 3:
                        break;
                }
                messageBox.innerHTML = messageOpener + message + messageCloser;
            });
        } catch (ex) {
            console.log(ex);
        }
    }
}

function IsNumeric(potNum) {
    return !isNaN(parseFloat(potNum)) && isFinite(potNum);
}

function TurntoArrayString(rawArray) {
    let stringArray = "";
    for (let i = 0; i < rawArray.length; i++) {
        if (rawArray.length == 1) {
            stringArray += "['" + rawArray[i].replaceAll("'", "").replaceAll("\"", "") + "']";
        } else {
            if (i == 0 && rawArray.length > 1) {
                stringArray += "['" + rawArray[i].replaceAll("'", "").replaceAll("\"", "") + "',";
            } else if (i == rawArray.length - 1 && rawArray.length > 1) {
                stringArray += "'" + rawArray[i].replaceAll("'", "").replaceAll("\"", "") + "']";
            } else {
                stringArray += "'" + rawArray[i].replaceAll("'", "").replaceAll("\"", "") + "',";
            }
        }
    }
    return stringArray;
}

function FileButtonClick(file, title, key, content) {
    if (file != null && file != "" && IsNumeric(key.length) == true && key.length >= 0) {
        let sectionButtonBaseTab = null;
        let tabContainer = $("#v-pills-tab");
        let contentContainer = $("#v-pills-tabContent");

        for (let fileKeyCount = 0; fileKeyCount < key.length; fileKeyCount++) {
            var curButtons = $("#v-pills-tab")[0].innerHTML.split("</button>");
            var addButton = true;
            for (var i = 0; i < curButtons.length; i++) {
                if (curButtons[i].includes(file + key[fileKeyCount])) {
                    addButton = false;
                    break;
                }
            }
            if (addButton == true) {
                if (title != null && title != "" && title.length > 0) {
                    if (content[fileKeyCount] == title) {
                        content[fileKeyCount] = "Included Document: " + content[fileKeyCount];
                    }
                }
                sectionButtonBaseTab = `<button class="m-2" id="${file}${key[fileKeyCount]}-tab" type="button" title="${title}" role="tab" aria-selected="true" onclick="DisplaySection('${file}${key[fileKeyCount]}-tab','${contentContainer[0].id}','${content[fileKeyCount].replaceAll("'", "").replaceAll("\"", "")}')">${title} - ${key[fileKeyCount]}</button>`;
                tabContainer[0].innerHTML += sectionButtonBaseTab;
            }
        }
    }
}
function WordFileButtonClick(file, title, key, content) {
    if (file != null && file != "" && IsNumeric(key.length) == true && key.length >= 0) {
        let sectionButtonBaseTab = null;
        let tabContainer = $("#v-pills-tab");
        let contentContainer = $("#v-pills-tabContent");
        let contentArray = content.split(',');

        let selectedFileButtons = document.querySelectorAll(`button[id='fileButton-${file}']`);
        if (!selectedFileButtons[0].classList.contains("selected-excel-file")) {
            $(`#fileButton-${file}`).addClass("selected-excel-file");
            for (let fileKeyCount = 0; fileKeyCount < key.length; fileKeyCount++) {
                if (contentArray[fileKeyCount] == title) {
                    contentArray[fileKeyCount] = "Included Document: " + contentArray[fileKeyCount];
                    sectionButtonBaseTab = `<button class="m-2" id="${file}${key[fileKeyCount]}-tab" type="button" title="${title}" role="tab" style="font-size:x-large;" aria-selected="true" onclick="DisplaySection('${file}${key[fileKeyCount]}-tab','${contentContainer[0].id}','${contentArray[fileKeyCount].replaceAll("'", "").replaceAll("\"", "")}')">${title} - ${key[fileKeyCount]}</button>`;
                    tabContainer[0].innerHTML += sectionButtonBaseTab;
                    contentArray.shift();
                } else {
                    for (var vi = 0; vi < contentArray.length; vi++) {
                        var currentButtonTitle = file + contentArray[vi] + "-tab";
                        var curButton = document.querySelectorAll(`button[id="${currentButtonTitle}"]`);
                        if (curButton.length === 0) {
                            var textStyle = contentArray[vi].split('⁝')[0];
                            var textValue = contentArray[vi].split('⁝')[1];
                            var textType = contentArray[vi].split('⁝')[2];
                            sectionButtonBaseTab = `<button class="m-2" id="${file}${key[fileKeyCount]}${vi}-tab" type="button" title="${title}" role="tab" style="font-size:${textStyle}" aria-selected="true" onclick="DisplaySection('${file}${key[fileKeyCount]}${vi}-tab','${contentContainer[0].id}','${textValue.replaceAll("'", "").replaceAll("\"", "")}')">${title} - ${textType} - ${textValue.replaceAll("'", "").replaceAll("\"", "")}</button>`;
                            tabContainer[0].innerHTML += sectionButtonBaseTab;
                        }
                    }
                }
            }
        } else {
            $(`#fileButton-${file}`).removeClass("selected-excel-file");
            var elementToRemove = document.querySelectorAll(`button[title='${title}']`);
            elementToRemove.forEach(element => {
                element.remove();
            })
        }
    }
}

function ExcelValueCheck(dataPoint, data, rowData, cellData) {
    let messageBox = $("#extractionMessage")[0];
    let messageOpener = `<p style="color:red; font-weight:bolder;">`;
    let message = "";
    let messageCloser = "</p>";
    var selectOptionC = "<option value'null' selected>Select a Column</option>";

    switch (dataPoint.name) {
        case "Pages":
            if (dataPoint.selectedIndex > 0) {
                var colmnData = data.split('⁝');
                var cData = colmnData[dataPoint.selectedIndex - 1];
                var cDataArray = cData.replaceAll('[', '').replaceAll(']', '').split(',');
                let uniqueCData = [...new Set(cDataArray)];

                var colRowData = cellData.split('⁝');
                var cCellData = colRowData[dataPoint.selectedIndex - 1];
                var cCellDataArray = cCellData.replaceAll('[', '').replaceAll(']', '').split(',');
                var dataTags = "";

                var rData = rowData.split('⁝');
                var pRData = rData[dataPoint.selectedIndex - 1];
                var rDataArray = pRData.replaceAll('[', '').replaceAll(']', '').split(',');

                uniqueCData.forEach(column => {
                    if (column !== null && column !== "") {
                        selectOptionC += `<option value="${column}">${column}</option>`;
                    }
                });

                var excelFileButtons = document.querySelectorAll("button[class$='selected-excel-file']");
                var currentPage = $("#titleIDP")[0].value;
                var displayhLocationValue = $(".h-Selected-Data")[0].value;
                var selectedExcelFileButton = "";
                var selectedPageDataPoint = [];
                var excelDataPointList = displayhLocationValue === "" || displayhLocationValue === null ? "" : JSON.parse($(".h-Selected-Data")[0].value);
                ;
                var previouslySelectedPage = sessionStorage.getItem('excelPreviousPage');
                var fileFound = false;

                if (previouslySelectedPage == null) {
                    sessionStorage.setItem('excelPreviousPage', currentPage);
                }

                if (excelFileButtons.length > 0) {
                    selectedExcelFileButton = excelFileButtons[0].id;
                }

                var selected = document.querySelectorAll("td>input[type='checkbox']:checked");

                if (selected.length > 0) {
                    selected.forEach(select => {
                        var dataPointCell = select.name;
                        var dataPointValue = select.value;
                        selectedPageDataPoint.push(dataPointCell + '⁝' + dataPointValue);
                    });

                    for (var ei = 0; ei < excelDataPointList?.length; ei++) {
                        if (excelDataPointList[ei].hasOwnProperty("file") && excelDataPointList[ei].file === selectedExcelFileButton) {
                            if (excelDataPointList[ei].hasOwnProperty("page") && excelDataPointList[ei].page === previouslySelectedPage) {
                                fileFound = true;
                                excelDataPointList[ei].datapoints = selectedPageDataPoint;
                            }
                        }
                    }

                    if (fileFound == false && selectedPageDataPoint.length > 0 && currentPage != "" && currentPage != null) {
                        var selectedPage = previouslySelectedPage == null ? currentPage : previouslySelectedPage;

                        var newFileObject = {
                            file: selectedExcelFileButton,
                            page: selectedPage,
                            datapoints: selectedPageDataPoint
                        }

                        if (excelDataPointList == null || excelDataPointList == "") {
                            excelDataPointList = [newFileObject];
                        } else {
                            excelDataPointList.push(newFileObject);
                        }
                    }
                    sessionStorage.setItem('excelPreviousPage', currentPage);
                    $(".h-Selected-Data")[0].value = JSON.stringify(excelDataPointList);
                }

                if (cCellDataArray.length === cDataArray.length) {
                    var tableOpener = `<div class="extract-table w-100"><table style="margin: 0px;width: inherit;">`;
                    var tableContent = "";
                    var tableCloser = `</div></table>`;

                    for (var ci = 0; ci < cCellDataArray.length; ci++) {
                        var currentIndexLetter = cDataArray[ci];
                        var currentIndexNumber = rDataArray[ci];

                        if (ci == 0) {
                            tableContent += `<tr>
                                <td name="td-${currentIndexLetter}${currentIndexNumber}">
                                <input type="checkbox" name="${currentIndexLetter}${currentIndexNumber}" value="${cCellDataArray[ci]}" title="${cCellDataArray[ci]}"/>
                                ${currentIndexLetter}${currentIndexNumber}
                                </td>`;
                        }
                        else if (currentIndexNumber > rDataArray[ci - 1]) {
                            tableContent += `</tr><tr><td name="td-${currentIndexLetter}${currentIndexNumber}">
                                <input type="checkbox" name="${currentIndexLetter}${currentIndexNumber}" value="${cCellDataArray[ci]}" title="${cCellDataArray[ci]}"/>
                                ${currentIndexLetter}${currentIndexNumber}
                                </td>`;
                        } else if (ci == cCellDataArray.length - 1) {
                            tableContent += `<td name="td-${currentIndexLetter}${currentIndexNumber}">
                                <input type="checkbox" name="${currentIndexLetter}${currentIndexNumber}" value="${cCellDataArray[ci]}" title="${cCellDataArray[ci]}"/>
                                ${currentIndexLetter}${currentIndexNumber}
                                </td></tr>`;
                        } else {
                            tableContent += `<td name="td-${currentIndexLetter}${currentIndexNumber}">
                                <input type="checkbox" name="${currentIndexLetter}${currentIndexNumber}" value="${cCellDataArray[ci]}" title="${cCellDataArray[ci]}"/>
                                ${currentIndexLetter}${currentIndexNumber}
                                </td>`;
                        }
                    }
                    dataTags = tableOpener + tableContent + tableCloser;
                }

                $("#titleIDC")[0].innerHTML = selectOptionC;
                $("#titleIDC").removeClass("visually-hidden");
                $("#v-pills-tabContent")[0].innerHTML = dataTags;

                ResetExcelDataPoints(selectedExcelFileButton, currentPage);
            } else {
                message = "Please select a valid page";
                $("#v-pills-tabContent")[0].innerHTML = "";
                $("#titleIDC").addClass("visually-hidden");
            }
            break;
        case "Columns":
            var currentPageIndex = $("#titleIDP")[0].selectedIndex;

            if (currentPageIndex > 0) {
                if (currentPageIndex > 0) {
                    var selectedColumn = $("#titleIDC")[0].selectedOptions[0].value;
                    var filteredColumns = document.querySelectorAll(`td[name^="td-${selectedColumn}"]`);
                    filteredColumns.forEach(tableData => {
                        var selectedFilteredColumns = tableData.querySelectorAll("input[type='checkbox']");
                        selectedFilteredColumns[0].checked = true;
                    });
                }
            } else {
                $("#titleIDR").addClass("visually-hidden");
            }
            break;
    }

    messageBox.innerHTML = messageOpener + message + messageCloser;
};

function ExcelFileButtonClick(titleID, pageTitle, sPageData, sColmnData, sRowData, sCellData) {
    var fileCount = document.querySelectorAll("button[id^='fileButton-']");
    if (fileCount.length < 2) {
        $("#closeDataSelectionBtn").click();
    }

    var displayLocation = $("#v-pills-tab");
    var displayhLocationValue = $(".h-Selected-Data")[0].value;
    $("#clearPageDataSelectionBtn").removeClass("visually-hidden");
    $("#clearAllDataSelectionBtn").removeClass("visually-hidden");
    var selectPOpener = `<div class="d-flex"><h5 class="pr-2">Pages: </h5><select class="custom-select" id="titleIDP" name="Pages" onChange="ExcelValueCheck(this, '${sColmnData}', '${sRowData}','${sCellData}')" required>`;
    var selectCOpener = `<div class="d-flex "><h5 class="pr-2">Categories: </h5><select class="custom-select visually-hidden" id="titleIDC" name="Columns" onChange="ExcelValueCheck(this, '${sRowData}', null, null);" required>`;
    var selectP = "";
    var selectC = "";
    var selectCloser = `</select></div>`;
    var defaultOptionP = `<option value="null" selected>Select a Page</option>`;
    var fileFound = false;

    var excelFileButtons = document.querySelectorAll("button[class$='selected-excel-file']");
    var selectedExcelFileButton = "";
    var selectedDataPoint = [];
    var excelDataPointList = displayhLocationValue === "" || displayhLocationValue === null ? "" : JSON.parse($(".h-Selected-Data")[0].value);
    var newPageLocation = "fileButton-" + titleID;

    var pageData = sPageData.split('⁝');
    selectP += selectPOpener + defaultOptionP;

    pageData.forEach(page => {
        if (page !== null && page !== "") {
            if (pageData.indexOf(page) == pageData.length - 1) {
                selectOption = `<option value="${page}">${page}</option>`;
                selectP += selectOption + selectCloser;
            } else {
                selectOption = `<option value="${page}">${page}</option>`;
                selectP += selectOption;
            }
        }
    });

    if (excelFileButtons.length > 0) {
        selectedExcelFileButton = excelFileButtons[0].id;
    }

    if (selectedExcelFileButton !== newPageLocation && $("#titleIDP")[0] !== undefined && $("#titleIDP")[0].selectedIndex > 0) {
        var currentPage = $("#titleIDP")[0].value;
        var selected = document.querySelectorAll("td>input[type='checkbox']:checked");
        selected.forEach(select => {
            var dataPointCell = select.name;
            var dataPointValue = select.value;
            selectedDataPoint.push(dataPointCell + '⁝' + dataPointValue);
        });

        for (var ei = 0; ei < excelDataPointList?.length; ei++) {
            if (excelDataPointList[ei].hasOwnProperty("file") && excelDataPointList[ei].file === selectedExcelFileButton) {
                if (excelDataPointList[ei].hasOwnProperty("page") && excelDataPointList[ei].page === currentPage) {
                    fileFound = true;
                    excelDataPointList[ei].datapoints = selectedDataPoint;
                }
            }
        }

        if (fileFound == false && selectedDataPoint.length > 0 && currentPage != "" && currentPage != null) {
            var newFileObject = {
                file: selectedExcelFileButton,
                page: currentPage,
                datapoints: selectedDataPoint
            }

            if (excelDataPointList == null || excelDataPointList == "") {
                excelDataPointList = [newFileObject];
            } else {
                excelDataPointList.push(newFileObject);
            }
        }

        $(".h-Selected-Data")[0].value = JSON.stringify(excelDataPointList);

        var currentFiles = document.querySelectorAll("button[id^='fileButton-']");
        currentFiles.forEach(files => {
            $(files).removeClass("selected-excel-file");
        });

        $(`#fileButton-${titleID}`).addClass("selected-excel-file");
        $("#v-pills-tabContent")[0].innerHTML = "";
        displayLocation[0].innerHTML = null;
        selectC = selectCOpener + selectCloser
        displayLocation[0].innerHTML = selectP;
        displayLocation[0].innerHTML += selectC;
    }
    else if (selectedExcelFileButton !== newPageLocation) {
        var currentFiles = document.querySelectorAll("button[id^='fileButton-']");
        currentFiles.forEach(files => {
            $(files).removeClass("selected-excel-file");
        });

        $(`#fileButton-${titleID}`).addClass("selected-excel-file");

        selectC = selectCOpener + selectCloser;
        displayLocation[0].innerHTML = selectP;
        displayLocation[0].innerHTML += selectC;
    } else {
        $(`#fileButton-${titleID}`).addClass("selected-excel-file");
        $("#v-pills-tabContent")[0].innerHTML = "";
        selectC = selectCOpener + selectCloser;
        displayLocation[0].innerHTML = selectP;
        displayLocation[0].innerHTML += selectC;
    }
}

function ResetExcelDataPoints(fileName, pageName) {
    var displayhLocationValue = $(".h-Selected-Data")[0].value;
    var exFileData = displayhLocationValue === "" || displayhLocationValue === null ? "" : JSON.parse($(".h-Selected-Data")[0].value);

    if (exFileData != null) {
        for (var ei = 0; ei < exFileData.length; ei++) {
            if (exFileData[ei].hasOwnProperty("file") && exFileData[ei].file === fileName) {
                if (exFileData[ei].hasOwnProperty("page") && exFileData[ei].page === pageName) {
                    for (dpi = 0; dpi < exFileData[ei].datapoints.length; dpi++) {
                        var datapointName = exFileData[ei].datapoints[dpi].split('⁝')[0];
                        var triggerDatapoint = document.querySelectorAll(`input[name^= '${datapointName}']`);
                        triggerDatapoint[0].checked = true;
                    }
                }
            }
        }
    }
}

function DisplaySection(callerID, section, content) {
    let caller = $("#" + callerID)[0];
    let seletedDiv = $("#" + section.replaceAll(" ", ''))[0];
    let contentTag = document.createElement("p");
    content = content.replaceAll("  ", '');
    contentTag.title = caller.title + "…" + caller.innerText;
    contentTag.append(content);
    const containerContent = document.querySelector("#v-pills-tabContent");
    var matches = containerContent.querySelectorAll("p");

    if (caller.classList.contains("neumorphic-btn-active")) {
        caller.classList.remove("neumorphic-btn-active");
        // Removing the content from the array
        var matchedPara = Array.from(matches, (paragraph) => paragraph.innerText);
        var cleanMatches = matchedPara.filter((para) => para !== content);

        seletedDiv.innerHTML = "";
        for (var paraCount = 0; paraCount < cleanMatches.length; paraCount++) {
            seletedDiv.innerHTML += "<p title='" + caller.title + "-" + caller.innerText + "'>" + cleanMatches[paraCount] + "</p>";
        }
    }
    else {
        caller.classList.add("neumorphic-btn-active");
        seletedDiv.append(contentTag);
    }
}

function SanitizeResponse(dataResponse) {
    var cleanDataObj = {};
    if (dataResponse != null && typeof (dataResponse) == 'object') {
        if (dataResponse.hasOwnProperty('callAction')) {
            if (dataResponse.callAction != null && typeof (dataResponse.callAction) == 'string' && dataResponse.callAction.trim() != "") {
                cleanDataObj.callAction = ReString(dataResponse.callAction.trim());
            }
        } else {
            return null;
        }

        if (dataResponse.hasOwnProperty('textFiles')) {
            if (dataResponse.textFiles != null && typeof (dataResponse.textFiles) == 'object' && Array.isArray(dataResponse.textFiles) == true && dataResponse.textFiles.length > 0) {
                cleanDataObj.textFiles = [];
                for (i = 0; i < dataResponse.textFiles.length; i++) {
                    if (dataResponse.textFiles[i].hasOwnProperty('paragraphs') && dataResponse.textFiles[i].hasOwnProperty('title')) {
                        cleanDataObj.textFiles[i] = [];
                        if (dataResponse.textFiles[i].hasOwnProperty('title')) {
                            if (dataResponse.textFiles[i].title != null && typeof (dataResponse.textFiles[i].title) == 'string' && dataResponse.textFiles[i].title.trim() != "") {
                                cleanDataObj.textFiles[i].title = String.empty;
                                cleanDataObj.textFiles[i].title = ReString(dataResponse.textFiles[i].title.trim());
                            } else {
                                return null;
                            }
                        } else {
                            return null;
                        }
                        if (dataResponse.textFiles[i].hasOwnProperty('paragraphs')) {
                            if (dataResponse.textFiles[i].paragraphs != null && typeof (dataResponse.textFiles[i].paragraphs) == 'string' && dataResponse.textFiles[i].paragraphs.trim() != "") {
                                cleanDataObj.textFiles[i].paragraphs = String.empty;
                                cleanDataObj.textFiles[i].paragraphs = ReString(dataResponse.textFiles[i].paragraphs.trim());
                            } else {
                                return null;
                            }
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                }
            }
        } else {
            return null;
        }

        if (dataResponse.hasOwnProperty('excelFiles')) {
            if (dataResponse.excelFiles != null && typeof (dataResponse.excelFiles) == 'object' && Array.isArray(dataResponse.excelFiles) == true && dataResponse.excelFiles.length > 0) {
                cleanDataObj.excelFiles = [];
                for (i = 0; i < dataResponse.excelFiles.length; i++) {
                    if (
                        dataResponse.excelFiles[i].hasOwnProperty('columns') && dataResponse.excelFiles[i].hasOwnProperty('data') && dataResponse.excelFiles[i].hasOwnProperty('pages') &&
                        dataResponse.excelFiles[i].hasOwnProperty('rows') && dataResponse.excelFiles[i].hasOwnProperty('tables') && dataResponse.excelFiles[i].hasOwnProperty('title')
                    ) {
                        cleanDataObj.excelFiles[i] = [];

                        if (typeof (dataResponse.excelFiles[i].pages) == 'object' && Array.isArray(dataResponse.excelFiles[i].pages) == true) {
                            if (Array.isArray(dataResponse.excelFiles[i].pages) == true && dataResponse.excelFiles[i].pages.length > 0) {
                                for (p = 0; p < dataResponse.excelFiles[i].pages.length; p++) {
                                    if (typeof (dataResponse.excelFiles[i].pages[p]) != 'string' || dataResponse.excelFiles[i].pages[p].trim() == "") {
                                        return null;
                                    }

                                    if (typeof (dataResponse.excelFiles[i].columns) == 'object' && Array.isArray(dataResponse.excelFiles[i].columns) == true) {
                                        if (Array.isArray(dataResponse.excelFiles[i].columns[p]) == true && dataResponse.excelFiles[i].columns[p].length > 0) {
                                            for (c = 0; c < dataResponse.excelFiles[i].columns[p].length; c++) {
                                                if (typeof (dataResponse.excelFiles[i].columns[p][c]) != 'string' || dataResponse.excelFiles[i].columns[p][c].trim() == "") {
                                                    return null;
                                                }
                                            }
                                            cleanDataObj.excelFiles[i].columns = [];
                                            cleanDataObj.excelFiles[i].columns = dataResponse.excelFiles[i].columns;
                                        }
                                    } else {
                                        return null;
                                    }

                                    if (typeof (dataResponse.excelFiles[i].data) == 'object' && Array.isArray(dataResponse.excelFiles[i].data) == true) {
                                        if (Array.isArray(dataResponse.excelFiles[i].data[p]) == true && dataResponse.excelFiles[i].data[p].length > 0) {
                                            for (d = 0; d < dataResponse.excelFiles[i].data[p].length; d++) {
                                                if (typeof (dataResponse.excelFiles[i].data[p][d]) != 'string' || dataResponse.excelFiles[i].data[p][d].trim() == "") {
                                                    return null;
                                                } else {
                                                    dataResponse.excelFiles[i].data[p][d] = dataResponse.excelFiles[i].data[p][d].trim().replace(/[^a-zA-Z0-9 .]/g, "");
                                                }
                                            }
                                            cleanDataObj.excelFiles[i].data = [];
                                            cleanDataObj.excelFiles[i].data = dataResponse.excelFiles[i].data;
                                        }
                                    } else {
                                        return null;
                                    }

                                    if (typeof (dataResponse.excelFiles[i].rows) == 'object' && Array.isArray(dataResponse.excelFiles[i].rows) == true) {
                                        if (Array.isArray(dataResponse.excelFiles[i].rows[p]) == true && dataResponse.excelFiles[i].rows[p].length > 0) {
                                            for (r = 0; r < dataResponse.excelFiles[i].rows[p].length; r++) {
                                                if (typeof (dataResponse.excelFiles[i].rows[p][r]) != 'string' || dataResponse.excelFiles[i].rows[p][r].trim() == "") {
                                                    return null;
                                                }
                                            }
                                            cleanDataObj.excelFiles[i].rows = [];
                                            cleanDataObj.excelFiles[i].rows = dataResponse.excelFiles[i].rows;
                                        }
                                    } else {
                                        return null;
                                    }
                                }
                                cleanDataObj.excelFiles[i].pages = [];
                                cleanDataObj.excelFiles[i].pages = dataResponse.excelFiles[i].pages;
                            } else {
                                return null;
                            }
                        } else {
                            return null;
                        }

                        if (typeof (dataResponse.excelFiles[i].tables) == 'object' && Array.isArray(dataResponse.excelFiles[i].tables) == true) {
                            if (Array.isArray(dataResponse.excelFiles[i].tables) == true && dataResponse.excelFiles[i].tables.length > 0) {
                                for (t = 0; t < dataResponse.excelFiles[i].tables.length; t++) {
                                    if (typeof (dataResponse.excelFiles[i].tables[t]) != 'string' || dataResponse.excelFiles[i].tables[t].trim() == "") {
                                        return null;
                                    }
                                }
                                cleanDataObj.excelFiles[i].tables = [];
                                cleanDataObj.excelFiles[i].tables = dataResponse.excelFiles[i].tables;
                            } else {
                                return null;
                            }
                        } else {
                            return null;
                        }

                        if (dataResponse.excelFiles[i].hasOwnProperty('title')) {
                            if (dataResponse.excelFiles[i].title != null && typeof (dataResponse.excelFiles[i].title) == 'string' && dataResponse.excelFiles[i].title.trim() != "") {
                                cleanDataObj.excelFiles[i].title = String.empty;
                                cleanDataObj.excelFiles[i].title = ReString(dataResponse.excelFiles[i].title.trim());
                            } else {
                                return null;
                            }
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                }
            }
        } else {
            return null;
        }

        if (dataResponse.hasOwnProperty('wordFiles')) {
            if (dataResponse.wordFiles != null && typeof (dataResponse.wordFiles) == 'object' && Array.isArray(dataResponse.wordFiles) == true && dataResponse.wordFiles.length > 0) {
                cleanDataObj.wordFiles = [];
                for (i = 0; i < dataResponse.wordFiles.length; i++) {
                    if (dataResponse.wordFiles[i].hasOwnProperty('paragraphs') && dataResponse.wordFiles[i].hasOwnProperty('title')) {
                        cleanDataObj.wordFiles[i] = [];
                        if (dataResponse.wordFiles[i].hasOwnProperty('title')) {
                            if (dataResponse.wordFiles[i].title != null && typeof (dataResponse.wordFiles[i].title) == 'string' && dataResponse.wordFiles[i].title.trim() != "") {
                                cleanDataObj.wordFiles[i].title = String.empty;
                                cleanDataObj.wordFiles[i].title = ReString(dataResponse.wordFiles[i].title.trim());
                            } else {
                                return null;
                            }
                        } else {
                            return null;
                        }
                        if (dataResponse.wordFiles[i].hasOwnProperty('paragraphs')) {
                            if (dataResponse.wordFiles[i].paragraphs != null && typeof (dataResponse.wordFiles[i].paragraphs) == 'object') {
                                cleanDataObj.wordFiles[i].paragraphs = [];
                                for (var wi = 0; wi < dataResponse.wordFiles[i].paragraphs.length; wi++) {
                                    var currentParagraph = dataResponse.wordFiles[i].paragraphs[wi];
                                    var openingTag = currentParagraph.substring(currentParagraph.indexOf('<'), currentParagraph.indexOf('>') + 1);

                                    if (openingTag == "<ul>") {
                                        openingTag = "<ul><li>";
                                    }

                                    var dataBodyWithCloser = currentParagraph.replace(openingTag, '');
                                    var closingTag = dataBodyWithCloser.substring(dataBodyWithCloser.indexOf('<'), dataBodyWithCloser.indexOf('>') + 1);
                                    var bodyTag = dataBodyWithCloser.replace(closingTag, '');
                                    var size = "";
                                    var valType = "";

                                    if (bodyTag !== null && bodyTag !== "") {
                                        switch (closingTag) {
                                            case '</title>':
                                                size = "xx-large⁝";
                                                valType = "⁝Title";
                                                break;
                                            case '</h1>':
                                                size = "larger⁝";
                                                valType = "⁝Header";
                                                break;
                                            case '</h2>':
                                                size = "large⁝";
                                                valType = "⁝Header";
                                                break;
                                            case '</h3>':
                                                size = "medium⁝";
                                                valType = "⁝Header";
                                                break;
                                            case '</h4>':
                                                size = "small⁝";
                                                valType = "⁝Header";
                                                break;
                                            case '</h5>':
                                                size = "smaller⁝";
                                                valType = "⁝Header";
                                                break;
                                            case '</li>':
                                            default:
                                                size = "inherit⁝";
                                                valType = "⁝Paragraph";
                                                break;
                                        }

                                        cleanDataObj.wordFiles[i].paragraphs.push(size + ReString(bodyTag) + valType);
                                    }
                                }
                            } else {
                                return null;
                            }
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                }
            }
        } else {
            return null;
        }
    } else {
        return null;
    }
    return cleanDataObj;
}

function ReString(content) {
    const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " ", ".", "_", "-", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var newContent = "";

    for (lett = 0; lett < content.length; lett++) {
        alphabets.forEach(letter => {
            if (letter == content[lett].toLowerCase()) {
                newContent += letter;
            }
        });
    }
    return newContent.toLowerCase();
}