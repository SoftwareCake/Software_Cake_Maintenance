$(document).ready(function () {
    $(".file-Table tr").on("click", function () {
        var fileName = this.querySelectorAll("td.fileName > p")[0].textContent.trim();

        if (document.querySelectorAll(`.file_folder > .${fileName.replaceAll(" ", "_").toLowerCase()}`).length === 0) {
            var folderName = this.querySelectorAll("td.directoryName > p")[0].textContent.trim();
            var fileSize = this.querySelectorAll("td.fileSize > p")[0].textContent.trim();
            var fileExten = this.querySelectorAll("td.fileExt > p")[0].innerText.trim();
            var fileType = this.querySelectorAll("td.fileType > p")[0].innerText.trim();
            var fileColor = "";
            var folderLocation = folderName + "/" + fileName + fileExten;
            var fileToRemoveName = fileName.replaceAll(" ", "_").toLowerCase();

            switch (fileType) {
                case "Text":
                    fileColor = "secondary";
                    break;
                case "Word":
                    fileColor = "primary";
                    break;
                case "PDF":
                case "Powerpoint":
                    fileColor = "danger";
                    break;
                case "Excel":
                    fileColor = "success";
                    break;
            }

            var selectedCard =
                "<div class='item-action dropdown ml-2 " + fileName.replaceAll(" ", "_").toLowerCase() + "'>" +
                "<a href='javascript:void(0);' class='" + fileName.replaceAll(" ", "_").toLowerCase() + " dropright' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
                "<div class='icon'>" +
                " <i class='fa-regular fa-file-" + fileType.toLowerCase() + " text-" + fileColor + "' style='height:inherit; padding-top: 5px;'></i>" +
                "</div>" +
                "<div class='file-name'>" +
                "<p class='d-none folderName'>" + folderName + "</p>" +
                "<p class='mb-0 text-muted text-truncate fileName'>" + fileName + "</p>" +
                "<p class='d-none fileType'>" + fileExten + "</p>" +
                "<small>" + fileSize + "</small>" +
                "</div>" +
                "</a>" +
                "<div class='dropdown-menu ml-3 flex'>" +
                "<a class='dropdown-item d-flex border-0' href='#' onclick='OpenFiles(\"" + folderLocation + "\",\"view\")'> <i class='dropdown-icon fa fa-eye'></i> View Details </a>" +
                "<a class='dropdown-item d-flex border-0' href='#' onclick='RemoveFileFromList(\"" + fileToRemoveName + "\")'> <i class='dropdown-icon fe fe-x'></i> Remove From List </a>" +
                "<a class='dropdown-item d-flex border-0' href='#' onclick='OpenFiles(\"" + folderLocation + "\",\"open\")'> <i class='dropdown-icon fa fa-regular fa-folder-open'></i> Open File </a>" +
                "<a class='dropdown-item d-flex border-0' href='#' onclick='OpenFiles(\"" + folderLocation + "\",\"download\")'> <i class='dropdown-icon fa fa-cloud-download'></i> Download </a>" +
                "<div class='dropdown-divider'></div>" +
                "<a class='dropdown-item d-flex border-0 bg-danger text-white bolder' href='#' onclick='OpenFiles(\"" + folderLocation + "\",\"delete\")'><i class='dropdown-icon fa fa-trash'></i> Delete </a>" +
                "</div>" +
                "</div>";
            $(".file_folder").append(selectedCard);
        }
    });
});

function GetFileInfo(actionType) {
    var files = [];
    var file = null;

    document.querySelectorAll(`.card-body .file_folder`).forEach((userItem) => {
        userItem.querySelectorAll("div").forEach((Item) => {
            Item.querySelectorAll(".folderName").forEach((i) => {
                file = i.innerText;
            });
            Item.querySelectorAll(".fileName").forEach((i) => {
                file += "/" + i.innerText;
            });
            Item.querySelectorAll(".fileType").forEach((i) => {
                file += i.innerText;
            });
            if (files.indexOf(file) === -1 && file !== null) {
                files.push(file);
            }
        });
    });

    OpenFiles(files, actionType);
}

//Helper Function
function PopulateViewModal(result) {
    $(".fileViewTabs").empty();
    $(".fileViewContent").empty();

    if (result.textFiles.length > 0 && result.textFiles !== null && result.textFiles !== undefined) {
        result.textFiles.forEach(FormateTextFileModal);
    }
    if (result.wordFiles.length > 0 && result.wordFiles !== null && result.wordFiles !== undefined) {
        result.wordFiles.forEach(FormateTextFileModal);
    }
    if (result.excelFiles.length > 0 && result.excelFiles !== null && result.excelFiles !== undefined) {
        result.excelFiles.forEach(FormateExcelFileModal);
    }
    if (result.textFiles.length <= 0 && result.wordFiles.length <= 0 && result.excelFiles.length <= 0) {
        FormatFileModalFailed();
    }
    //if (result.powerpointFiles.length > 0 && result.excelFiles !== null && result.powerpointFiles !== undefined) {
    //    null;
    //}

    $("#fileViewModalBtn").click();
}

function FormateTextFileModal(file) {
    var fileIndex = file.title.indexOf('.');
    var fileLength = file.title.length;
    var fileSubstring = file.title.substring(fileIndex, fileLength);
    var fileName = file.title.replace(fileSubstring, '').replaceAll(" ", "_").toLowerCase();
    var context = file.paragraphs;

    var firstTab = `
        <button class="nav-link active" id="v-pills-${fileName}-tab" data-bs-toggle="pill" data-bs-target="#v-pills-${fileName}" type="button" role="tab" aria-controls="v-pills-${fileName}" aria-selected="true">
            ${file.title.trim()}
        </button>
    `;

    var tab = `
        <button class="nav-link" id="v-pills-${fileName}-tab" data-bs-toggle="pill" data-bs-target="#v-pills-${fileName}" type="button" role="tab" aria-controls="v-pills-${fileName}" aria-selected="true">
            ${file.title.trim()}
        </button>
    `;

    if (Array.isArray(file.paragraphs)) {
        context = "";
        for (var i = 0; i < file.paragraphs.length; i++) {
            context += file.paragraphs[i];
        }
    }

    var firstContent = `
            <div class="tab-pane fade show active pl-4" id="v-pills-${fileName}" role="tabpanel" aria-labelledby="v-pills-${fileName}-tab">
                ${context}
            </div>
        `

    var content = `
            <div class="tab-pane fade show" id="v-pills-${fileName}" role="tabpanel" aria-labelledby="v-pills-${fileName}-tab">
                ${context}
            </div>
        `

    if ($(".fileViewTabs")[0].childElementCount <= 0) {
        $(".fileViewTabs").append(firstTab);
        $(".fileViewContent").append(firstContent);
    } else {
        $(".fileViewTabs").append(tab);
        $(".fileViewContent").append(content);
    }
}

function FormateExcelFileModal(file) {
    var fileIndex = file.title.indexOf('.');
    var fileLength = file.title.length;
    var fileSubstring = file.title.substring(fileIndex, fileLength);
    var fileName = file.title.replace(fileSubstring, '').replaceAll(" ", "_").toLowerCase();
    var fileTables = file.tables;
    var filePages = file.pages;

    var firstTab = `
        <button class="nav-link active" id="v-pills-${fileName}-tab" data-bs-toggle="pill" data-bs-target="#v-pills-${fileName}" type="button" role="tab" aria-controls="v-pills-${fileName}" aria-selected="true">
            ${file.title.trim()}
        </button>
    `;

    var tab = `
        <button class="nav-link" id="v-pills-${fileName}-tab" data-bs-toggle="pill" data-bs-target="#v-pills-${fileName}" type="button" role="tab" aria-controls="v-pills-${fileName}" aria-selected="true">
            ${file.title.trim()}
        </button>
    `;

    var context = "";
    var page = "";

    var tableNavTab = "<ul class=\"nav nav-tabs\" id=\"myTableTabs\" role=\"tablist\">";
    for (var t = 0; t < filePages.length; t++) {
        tableNavTab += "<li class=\"nav-item\">";
        if (t === 0) {
            page = "<a class=\"nav-link active\" id=\"" + filePages[t].replaceAll(" ", "_").toLowerCase().replaceAll("\"", "").replaceAll("'", "") + "-tab\" data-toggle=\"tab\" href=\"#" + filePages[t].replaceAll(" ", "_").toLowerCase().replaceAll("\"", "").replaceAll("'", "") + "\" role=\"tab\" aria-controls=\"" + filePages[t].replaceAll(" ", "_").toLowerCase().replaceAll("\"", "").replaceAll("'", "") + "\" aria-selected=\"true\">" + filePages[t].replaceAll("\"", "").replaceAll("'", "") + "</a>"
        } else {
            page = "<a class=\"nav-link\" id=\"" + filePages[t].replaceAll(" ", "_").toLowerCase().replaceAll("\"", "").replaceAll("'", "") + "-tab\" data-toggle=\"tab\" href=\"#" + filePages[t].replaceAll(" ", "_").toLowerCase().replaceAll("\"", "").replaceAll("'", "") + "\" role=\"tab\" aria-controls=\"" + filePages[t].replaceAll(" ", "_").toLowerCase().replaceAll("\"", "").replaceAll("'", "") + "\" aria-selected=\"true\">" + filePages[t].replaceAll("\"", "").replaceAll("'", "") + "</a>"
        }
        tableNavTab += page + "</li>";
    }
    tableNavTab += "</ul>";

    var tableNavContext = "<div class=\"tab-content\" id=\"myTabContent\">";
    for (var c = 0; c < fileTables.length; c++) {
        if (c === 0) {
            tableNavContext += "<div class=\"tab-pane fade show active\" id=\"" + filePages[c].replaceAll(" ", "_").toLowerCase().replaceAll("\"", "").replaceAll("'", "") + "\" style=\"width:max-content\" role=\"tabpanel\" aria-labelledby=\"" + filePages[c].replaceAll(" ", "_").toLowerCase().replaceAll("\"", "").replaceAll("'", "") + "-tab\">" + fileTables[c] + "</div>";
        } else {
            tableNavContext += "<div class=\"tab-pane fade show\" id=\"" + filePages[c].replaceAll(" ", "_").toLowerCase().replaceAll("\"", "").replaceAll("'", "") + "\" style=\"width:max-content\" role=\"tabpanel\" aria-labelledby=\"" + filePages[c].replaceAll(" ", "_").toLowerCase().replaceAll("\"", "").replaceAll("'", "") + "-tab\">" + fileTables[c] + "</div>";
        }
    }
    tableNavContext += "</div>";

    context += tableNavTab;
    context += tableNavContext;
    var firstContent = `
            <div class="tab-pane fade show active" id="v-pills-${fileName}" role="tabpanel" aria-labelledby="v-pills-${fileName}-tab">
                ${context}
            </div>
        `

    var content = `
            <div class="tab-pane fade show" id="v-pills-${fileName}" role="tabpanel" aria-labelledby="v-pills-${fileName}-tab">
                ${context}
            </div>
        `

    if ($(".fileViewTabs")[0].childElementCount <= 0) {
        $(".fileViewTabs").append(firstTab);
        $(".fileViewContent").append(firstContent);
    } else {
        $(".fileViewTabs").append(tab);
        $(".fileViewContent").append(content);
    }
}

function OpenFiles(location, actionType) {
    if (location !== "" && location !== null) {
        var vform = $('#__AjaxAntiForgeryForm');
        var token = $('input[name="__RequestVerificationToken"]', vform).val();
        $.ajax({
            type: "POST",
            url: 'CallFileMana',
            data: {
                __RequestVerificationToken: token,
                "function": actionType,
                "jsFiles": location
            }
        }).done(function (result) {
            if (!result.error && result.callAction !== undefined && result.callAction !== null) {
                if (actionType != "download") {
                    PopulateViewModal(result);
                } else {
                    CreateDownloadLink(result)
                }
            } else {
                window.location.reload();
            }
        });
    }
}

function RemoveFileFromList(location) {
    if (Array.isArray("" + location + "")) {
        for (var i = 0; i < location.length; i++) {
            if (document.querySelectorAll(".file_folder > ." + location[i]).length > 0) {
                $("#Library-all").click();
                $(".file_folder").find("." + location[i]).remove();
            }
        }
    }
    else if (location === "" || location === undefined || location === null) {
        $("#Library-all").click();
        $(".file_folder").empty();
    }
    else {
        $("#Library-all").click();
        $(".file_folder").find("." + location).remove();
    }
}

function FormatFileModalFailed() {
    var firstTab = `
        <button class="nav-link active" id="v-pills-failed-tab" data-bs-toggle="pill" data-bs-target="#v-pills-failed" type="button" role="tab" aria-controls="v-pills-failed" aria-selected="true">
            Failed - File is Inaccessible
        </button>
    `;
    var firstContent = `
            <div class="tab-pane fade show active" id="v-pills-failed" role="tabpanel" aria-labelledby="v-pills-failed-tab">
                Unfortunatly we were unable to process the file you have requested. <br/>If it is opened some where else please close it and try again or try a different file.
            </div>
        `
    $(".fileViewTabs").append(firstTab);
    $(".fileViewContent").append(firstContent);
}

function CreateDownloadLink(fileDataRes) {
    if (fileDataRes.textFiles.length > 0) {
        fileDataRes.textFiles.forEach((element) => {
            var saveData = (function () {
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                return function (data, fileName) {
                    var json = JSON.stringify(data),
                        blob = new Blob([json], { type: "octet/stream" }),
                        url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = fileName;
                    a.click();
                    window.URL.revokeObjectURL(url);
                };
            }());
            var data = element.paragraphs, fileName = element.title;
            saveData(data, fileName);
        });
    }
    if (fileDataRes.wordFiles.length > 0) {
        fileDataRes.wordFiles.forEach((element) => {
            var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
                "xmlns:w='urn:schemas-microsoft-com:office:word' " +
                "xmlns='http://www.w3.org/TR/REC-html40'>" +
                "<head><meta charset='utf-8'><title>Download Word Document</title></head><body>";
            var footer = "</body></html>";

            var sourceHTML = header + element.paragraphs.join(' ') + footer;

            var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
            var fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = element.title + ".doc";
            fileDownload.click();
            document.body.removeChild(fileDownload);
        });
    }
    if (fileDataRes.excelFiles.length > 0) {
        fileDataRes.excelFiles.forEach((element) => {
            var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
                "xmlns:w='urn:schemas-microsoft-com:office:word' " +
                "xmlns='http://www.w3.org/TR/REC-html40'>" +
                "<head><meta charset='utf-8'><title>Download Word Document</title></head><body>";
            var footer = "</body></html>";

            var sourceHTML = header + element.tables.join(' ') + footer;

            var source = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(sourceHTML);
            var fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = element.title + ".xls";
            fileDownload.click();
            document.body.removeChild(fileDownload);
        });
    }
};

