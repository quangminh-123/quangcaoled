
$('.sliderImagesCongTrinh').slick({
		dots: true,
	
		speed: 600,
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]
    });
    

    var toTopButton = document.querySelector(".buttonTopPro");
	toTopButton.style.display = "none";
	document.querySelector('body').onscroll = function () {
		if (window.innerHeight + 150 < document.body.offsetHeight) //if document long enough
			if (window.scrollY + window.innerHeight > document.body.offsetHeight -
				150
			) //if scroll is 150px from bottom (if 'bottom of what we are looking at' is > than 'bottom of document - 150px earlier)
				toTopButton.style.display = "block";
			else
				toTopButton.style.display = "none";
	};
	

	$(function() {
		$("#scheduler").kendoScheduler({
			date: new Date("2019/6/13"),
			startTime: new Date("2019/6/13 07:00 AM"),
			height: 600,
			views: [
				"day",
				
				"week",
				"month",
				{ type: "month", selected: true },
				"agenda",
				{ type: "timeline", eventHeight: 50}
			],
			timezone: "Etc/UTC",
			dataSource: {
				batch: true,
				transport: {
					read: {
						url: "https://demos.telerik.com/kendo-ui/service/tasks",
						dataType: "jsonp"
					},
					update: {
						url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
						dataType: "jsonp"
					},
					create: {
						url: "https://demos.telerik.com/kendo-ui/service/tasks/create",
						dataType: "jsonp"
					},
					destroy: {
						url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
						dataType: "jsonp"
					},
					parameterMap: function(options, operation) {
						if (operation !== "read" && options.models) {
							return {models: kendo.stringify(options.models)};
						}
					}
				},
				schema: {
					model: {
						id: "taskId",
						fields: {
							taskId: { from: "TaskID", type: "number" },
							title: { from: "Title", defaultValue: "No title", validation: { required: true } },
							start: { type: "date", from: "Start" },
							end: { type: "date", from: "End" },
							startTimezone: { from: "StartTimezone" },
							endTimezone: { from: "EndTimezone" },
							description: { from: "Description", title: "Người thêm" },
							recurrenceId: { from: "RecurrenceID" },
							recurrenceRule: { from: "RecurrenceRule" },
							recurrenceException: { from: "RecurrenceException" },
							ownerId: { from: "OwnerID", defaultValue: 1 },
							isAllDay: { type: "boolean", from: "IsAllDay" }
						}
					}
				},
				filter: {
					logic: "or",
					filters: [
						{ field: "ownerId", operator: "eq", value: 1 },
						{ field: "ownerId", operator: "eq", value: 2 }
					]
				}
			},
			resources: [
				{
					field: "ownerId",
					title: "Người thêm",
					dataSource: [
						{ text: "Lương Hồng Quân", value: 1, color: "#f8a398" },
						{ text: "Đỗ Viết Mạnh", value: 2, color: "#51a0ed" },
						{ text: "Nguyễn Quang Minh", value: 3, color: "#56ca85" }
					]
				}
			]
		});
	
		$("#people :checkbox").change(function(e) {
			var checked = $.map($("#people :checked"), function(checkbox) {
				return parseInt($(checkbox).val());
			});
	
			var scheduler = $("#scheduler").data("kendoScheduler");
	
			scheduler.dataSource.filter({
				operator: function(task) {
					return $.inArray(task.ownerId, checked) >= 0;
				}
			});
		});
	});