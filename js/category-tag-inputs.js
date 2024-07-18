var tagsArray = [];
var tagsArrayLowered = [];
var slideTwo = document.querySelector('.example-modal-toggle2');
var containerView = document.querySelector('.category-select-view');
var container = document.querySelector('.category-select');
var input = document.querySelector('.category-select input');
var selection = document.querySelector('.category-selection-input');
var tags = document.querySelector('.js-tags');
var addCategories = document.querySelector('.add-categories');
var errorMessage = document.querySelector('.error-message');
var categories = document.querySelector('.js-tags');

$(document).ready(function () {
    if (window.location.pathname === "/Profile/TaskBoard") {
        sessionStorage.removeItem("grouping");

        containerView.addEventListener('click', function () {
            selection.focus();
        });

        container.addEventListener('keydown', function (evt) {
            var value = String(evt.target.value).replace(/[^a-zA-Z -]/g, '').trim();

            if (value === '' || value === ' ') {
                evt.target.value = '';
                return;
            }

            if (!evt.target.matches('.category-selection-input')) {
                return;
            }

            if (evt.keyCode === 13) {
                var RegExpression = /^[a-zA-Z]+\s?[a-zA-Z]+$/;

                if (RegExpression.test(value)) {
                    if (evt.keyCode === 13 && tagsArrayLowered.includes(value.toLowerCase())) {
                        evt.target.value = '';
                        errorMessage.textContent = "This category already added. Please enter another category.";
                        return;
                    }

                    if (!value.length || value.length > 20) {
                        errorMessage.textContent = "This category is to long. We only allow for a 20 character limit catergory name. Please enter another category.";
                        return;
                    }

                    if (tagsArray.length === 12) {
                        errorMessage.textContent = "There is a 12 category limit. If you would like to replace one please click the category you would like to replace.";
                        return;
                    }

                    input.value = '';
                    evt.target.value = '';
                    errorMessage.textContent = '';
                    tagsArray.push(value);
                    render(tagsArray, tags);
                }
                else {
                    if ((value.match(/ /g) || []).length > 1) {
                        errorMessage.innerHTML = "This category includes to many spaces. We only allow for one space for 2 word categories. <br/> Please enter another category.";
                    } else {
                        errorMessage.textContent = "Special characters are not permitted. Please remove the character and try again or enter another category.";
                    }
                    return;
                }
            } else {
                return;
            }
        });

        containerView.addEventListener('click', function (evt) {
            if (evt.target.matches('.js-tag-close') || evt.target.matches('.js-tag')) {
                tagsArray = tagsArray.filter(function (tag, i) {
                    return i !== parseInt(evt.target.getAttribute('data-index'));
                });
                if (tagsArray.length <= 0) {
                    addCategories.classList.remove("enabled");
                    addCategories.classList.add("disabled");
                }
                render(tagsArray, tags);
            }
        }, true);

        categories.addEventListener('DOMSubtreeModified', function () {
            var categoryCount = categories.querySelectorAll('.category-tag').length;

            if (categoryCount > 0) {
                addCategories.classList.remove("disabled");
                addCategories.classList.add("enabled");
                UnlockGrouping();
            }
        });
    }
});

$('.preset-list').on('change', function () {
    if (parseInt(this.value) === 0) {
        sessionStorage.removeItem("grouping");
    }

    tagsArray = [];
    tagsArrayLowered = [];

    // Presets
    var generalPreset = ["To Do", "In Progress", "Complete"];
    var developmentPreset = ["Backlog", "Approved", "Review Request", "ReOpened", "In Progress", "Coding", "Testing", "MTP", "Cancelled", "Closed", "Complete"];
    var shoppingListPreset = ["Fruits", "Fruit Juice", "Vegetables", "Proteins", "Nuts", "Dairy", "Miscellaneous"];
    var inboxSupportPreset = ["Inbox", "To Do", "In Progress", "Waiting", "Outbox", "Closed"];
    var writingPreset = ["Ideas", "First Draft", "Revisions", "Proofread", "Edits", "Final Draft"];
    var weeksPreset = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var planningPreset = ["Not Started", "New", "In Progress", "Design", "Implementation", "Brainstorming", "Review", "On Hold", "Closed", "Cancelled"];
    var projectDiscoveryPreset = ["Research", "Design", "In Review", "Development", "Fixing", "Complete"];
    var clientOrdersPreset = ["Pending", "Waiting", "In Progress", "Completed", "Rejected"];

    // Presets to lower
    var generalPresetLower = generalPreset.map(element => {
        return element.toLowerCase();
    });

    var developmentPresetLower = developmentPreset.map(element => {
        return element.toLowerCase();
    });

    var shoppingListPresetLower = shoppingListPreset.map(element => {
        return element.toLowerCase();
    });

    var inboxSupportPresetLower = inboxSupportPreset.map(element => {
        return element.toLowerCase();
    });

    var writingPresetLower = writingPreset.map(element => {
        return element.toLowerCase();
    });

    var weeksPresetLower = weeksPreset.map(element => {
        return element.toLowerCase();
    });

    var planningPresetLower = planningPreset.map(element => {
        return element.toLowerCase();
    });

    var projectDiscoveryPresetLower = projectDiscoveryPreset.map(element => {
        return element.toLowerCase();
    });

    var clientOrdersPresetLower = clientOrdersPreset.map(element => {
        return element.toLowerCase();
    });

    switch (parseInt(this.value)) {
        case 1:
            if (!tagsArrayLowered.includes(generalPresetLower)) {
                tagsArray = tagsArray.concat(generalPreset);
                tagsArrayLowered = tagsArrayLowered.concat(generalPresetLower);
            }
            break;
        case 2:
            if (!tagsArrayLowered.includes(developmentPresetLower)) {
                tagsArray = tagsArray.concat(developmentPreset);
                tagsArrayLowered = tagsArrayLowered.concat(developmentPresetLower);
            }
            break;
        case 3:
            if (!tagsArrayLowered.includes(shoppingListPresetLower)) {
                tagsArray = tagsArray.concat(shoppingListPreset);
                tagsArrayLowered = tagsArrayLowered.concat(shoppingListPresetLower);
            }
            break;
        case 4:
            if (!tagsArrayLowered.includes(inboxSupportPresetLower)) {
                tagsArray = tagsArray.concat(inboxSupportPreset);
                tagsArrayLowered = tagsArrayLowered.concat(inboxSupportPresetLower);
            }
            break;
        case 5:
            if (!tagsArrayLowered.includes(writingPresetLower)) {
                tagsArray = tagsArray.concat(writingPreset);
                tagsArrayLowered = tagsArrayLowered.concat(writingPresetLower);
            }
            break;
        case 6:
            if (!tagsArrayLowered.includes(weeksPresetLower)) {
                tagsArray = tagsArray.concat(weeksPreset);
                tagsArrayLowered = tagsArrayLowered.concat(weeksPresetLower);
            }
            break;
        case 7:
            if (!tagsArrayLowered.includes(planningPresetLower)) {
                tagsArray = tagsArray.concat(planningPreset);
                tagsArrayLowered = tagsArrayLowered.concat(planningPresetLower);
            }
            break;
        case 8:
            if (!tagsArrayLowered.includes(projectDiscoveryPresetLower)) {
                tagsArray = tagsArray.concat(projectDiscoveryPreset);
                tagsArrayLowered = tagsArrayLowered.concat(projectDiscoveryPresetLower);
            }
            break;
        case 9:
            if (!tagsArrayLowered.includes(clientOrdersPresetLower)) {
                tagsArray = tagsArray.concat(clientOrdersPreset);
                tagsArrayLowered = tagsArrayLowered.concat(clientOrdersPresetLower);
            }
            break;
    }

    if (tagsArray.length <= 0) {
        addCategories.classList.remove("enabled");
        addCategories.classList.add("disabled");
    }

    render(tagsArray, tags);
});

$('.add-categories').on('click', function () {
    var categoryCount = categories.querySelectorAll('.category-tag').length;
    let openTwo = sessionStorage.getItem("grouping");

    if (categoryCount <= 0) {
        errorMessage.textContent = "Please select a preset category or enter your custom categoories.";
    }

    if (categoryCount > 0 && openTwo === null && addCategories.classList.contains("disabled") && !addCategories.classList.contains("enabled")) {
        addCategories.classList.remove("disabled");
    }

    if (openTwo === "true" && categoryCount > 0 && addCategories.classList.contains("enabled")) {
        SubmitCategories();
    }
});

$('.new_taskboard').on('click', function () {
    errorMessage.textContent = '';
    var categoryCount = categories.querySelectorAll('.category-tag').length;

    if (categoryCount <= 0) {
        addCategories.classList.remove("enabled");
        addCategories.classList.add("disabled");
    }
});

function render(tags, el) {
    el.innerHTML = tags.map(function (tag, i) {
        return (
            '<div class="category-tag js-tag" data-index="' + i + '">' +
            tag +
            '<span class="tag-close js-tag-close" data-index="' + i + '">×</span>' +
            '</div>'
        );
    }).join('');

    tagsArrayLowered = tags.map(element => {
        return element.toLowerCase();
    });

    if (tags.length !== 12) {
        container.querySelector('.category-selection-input').focus();
    }

    $("#textInput").css("width", "100%");
}

function UnlockGrouping() {
    sessionStorage.setItem("grouping", "true");
}

function SubmitCategories() {
    var RegExpression = /^[A-Za-z0-9 ,]+$/;
    var categorylist = tagsArray.join();
    var actionType = "Save Categories";

    if (RegExpression.test(categorylist)) {
        var vform = $('#__AjaxAntiForgeryForm');
        var token = $('input[name="__RequestVerificationToken"]', vform).val();
        var project = $('.project-name')[0].value;

        $.ajax({
            type: "POST",
            url: 'SaveTaskBoard',
            data: {
                __RequestVerificationToken: token,
                "function": actionType,
                "CategoryList": categorylist,
                "ProjectName": project
            }
        }).done(function (Result) {
            if (Result.status !== false) {
                sessionStorage.removeItem("grouping");
                location.reload();
            }
        });
    }
}

function ReloadCategories(thisClass) {
    var main = $(".i-project-named")[0];
    var add = $(".a-project-named")[0];
    var mainSelected = main.selectedOptions[0].value;
    var addSelected = add.selectedOptions[0].value;
    var selectedProject = null;

    if (mainSelected !== addSelected) {
        if (thisClass.classList.value == "i-project-named") {
            selectedProject = mainSelected;
        } else {
            selectedProject = addSelected;
        }
    } else {
        selectedProject = mainSelected;
    }

    if (selectedProject !== "" || selectedProject === null || selectedProject !== undefined) {
        var vform = $('#__AjaxAntiForgeryForm');
        var token = $('input[name="__RequestVerificationToken"]', vform).val();
        $.ajax({
            type: "POST",
            url: 'ProjectView',
            data: {
                __RequestVerificationToken: token,
                "IProjectNamed": selectedProject.replace('-', ' ')
            }
        }).done(function (result) {
            if (result !== null || result !== String.empty) {
                if (result.hasOwnProperty('categories') && result.categories[0].length > 0) {
                    var categoriesList = CleanCategories(result.categories[0]);

                    var categoriesListView = "";
                    var categoriesScrumView = "";
                    var categoriesAddView = "";

                    for (i = 0; i < categoriesList.length; i++) {
                        categoriesListView += `<div class="col-lg-3 col-md-6">
                                          <a class="${categoriesList[i].replace(' ', '-')}-${i}-Category" onclick="FilterCategoryTasks('${categoriesList[i].replace(' ', '-')}')">
                                              <div class="card">
                                                  <div class="card-body text-center">
                                                      <h6 class="cat-label">${categoriesList[i]}</h6>
                                                  </div>
                                              </div>
                                          </a>
                                      </div>`;
                    }

                    for (i = 0; i < categoriesList.length; i++) {
                        categoriesScrumView +=
                            `
                        <div class="col-lg-4 col-md-12">
                            <div class="card planned_task">
                                <div class="card-header">
                                    <h3 class="card-title">${categoriesList[i]}</h3>
                                </div>
                                <div class="card-body">
                                    <div class="dd" data-plugin="nestable">
                                        <ol id="reloadScrumTasks-${categoriesList[i]}" class="dd-list">
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                    }

                    for (i = 0; i < categoriesList.length; i++) {
                        categoriesAddView += `<option>${categoriesList[i]}</option>`
                    }

                    $(".task-categories")[0].innerHTML = categoriesListView;
                    $(".task-add-categories")[0].innerHTML = categoriesAddView;
                    main.value = selectedProject.replace(' ', '-');
                    add.value = selectedProject.replace(' ', '-');
                }
            }
        });
    }
}

function CleanCategories(categories) {
    var cleanCats = [];
    var filterCategory = String.empty;
    var categoriesList = categories.split(',');

    for (i = 0; i < categoriesList.length; i++) {
        filterCategory = CleanString(categoriesList[i]);
        cleanCats.push(filterCategory.trim());
    }

    return cleanCats;
}

function FilterCategoryTasks(selectedProject) {
    $("#taskboardTaskView tr").filter(function () {
        $(this).toggle($(this).text().indexOf(selectedProject) > -1)
    });
}

function CleanString(content) {
    const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " ", ".", "_", "-"];
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