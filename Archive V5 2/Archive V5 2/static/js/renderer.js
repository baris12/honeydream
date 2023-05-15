const currentFilename = window.location.pathname.split('/').pop();
if(currentFilename == "honeypot1.html"){
    data.switchPod(1)
    data.montlySales2().then(data => {
    
        let Jan = 0
        let Feb = 0
        let Mar = 0
        let Apr = 0
        let May = 0
        let Jun = 0
        let Jul = 0 
        let Aug = 0
        let Sep = 0
        let Oct = 0
        let Nov = 0
        let Dec = 0
    
        data.forEach(time => {
            let monthName = String(time.month)
            if(monthName == "Jan"){
                Jan = Jan + 1
            }
            if(monthName == "Feb"){
                Feb = Feb + 1
            }
            if(monthName == "Mar"){
                Mar = Mar + 1
            }
            if(monthName == "Apr"){
                Apr = Apr + 1
            }
            if(monthName == "May"){
                May = May + 1
            }
            if(monthName == "Jun"){
                Jun = Jun + 1
            }
            if(monthName == "Jul"){
                Jul = Jul + 1
            }
            if(monthName == "Aug"){
                Aug = Aug + 1 
            }
            if(monthName == "Sep"){
                Sep = Sep + 1
            }
            if(monthName == "Oct"){
                Oct = Oct + 1
            }
            if(monthName == "Nov"){
                Nov = Nov + 1
            }
            if(monthName == "Dec"){
                Dec = Dec + 1
            }
        })
            var ctx = document.getElementById("chartjs-dashboard-line-2").getContext("2d");
            var gradient = ctx.createLinearGradient(0, 0, 0, 225);
            gradient.addColorStop(0, "rgba(215, 227, 244, 1)");
            gradient.addColorStop(1, "rgba(215, 227, 244, 0)");
            // Line chart
            new Chart(document.getElementById("chartjs-dashboard-line-2"), {
                type: "line",
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [{
                        label: "Visitor",
                        fill: true,
                        backgroundColor: gradient,
                        borderColor: window.theme.primary,
                        data: [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec],
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    tooltips: {
                        intersect: false
                    },
                    hover: {
                        intersect: true
                    },
                    plugins: {
                        filler: {
                            propagate: false
                        }
                    },
                    scales: {
                        xAxes: [{
                            reverse: true,
                            gridLines: {
                                color: "rgba(0,0,0,0.0)"
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                stepSize: 1000
                            },
                            display: true,
                            borderDash: [3, 3],
                            gridLines: {
                                color: "rgba(0,0,0,0.0)"
                            }
                        }]
                    }
                }
            });
})
}else if(currentFilename == "honeypot2.html"){
    data.switchPod(2)

}else if(currentFilename == "honeypot3.html"){
    data.switchPod(3)
}

let pageLimit;

data.dangerUser().then(_data =>{
    document.getElementById("alertNumberID").innerHTML = _data.dangerUserCount
})


data.visitors().then(_data=>{
    document.getElementById("visitors").innerHTML = _data.dangerUserCount
})

function getLatestProjects(page,itemnum){
    document.getElementById('tables').innerHTML = ""
    data.latestProject(page,itemnum).then(_data => {
        pageLimit = _data.pageCount
        console.log("PAGE LIMIT : ", _data)
        _data.data.forEach(pData => {
            console.log(pData)
            document.getElementById('tables').innerHTML += `
            <tr>
                <td>${pData._doc.pid}</td>
                <td>${pData._doc.hostIP}</td>
                <td>${pData._doc.method}</td>
                <td>${pData._doc.path}</td>
                <td>${pData._doc.status}</td>
                <td class="d-xl-table-cell">${pData._doc.date}</td>
                <td><span class="badge  ${pData._doc.alertLevel == "Low" ? "bg-success" : ""} ${pData._doc.alertLevel == "Medium" ? "bg-warning" : ""} ${pData._doc.alertLevel == "Very High" ? "bg-danger" : ""} ${pData._doc.alertLevel == "High" ? "bg-danger" : ""}">${pData._doc.alertLevel}</span></td>
                <td><span class="">${pData._doc.alertDescription}</span></td>
                <td class="d-xl-table-cell">${moment(pData._doc.uploadedDate).format('DD-MM-YYYY')}</td>
                <td class="d-xl-table-cell">${moment(pData._doc.createdAt).format('DD-MM-YYYY')}</td>
                <td class="d-xl-table-cell">${moment(pData._doc.updatedAt).format('DD-MM-YYYY')}</td>
            </tr>
            `
        })
    })
}
getLatestProjects(1,10)

data.montlySales().then(_data => { 
    let Jan = 0
    let Feb = 0
    let Mar = 0
    let Apr = 0
    let May = 0
    let Jun = 0
    let Jul = 0 
    let Aug = 0
    let Sep = 0
    let Oct = 0
    let Nov = 0
    let Dec = 0

    _data.forEach(time => {
        let monthName = String(time).split(" ")[1]
        if(monthName == "Jan"){
            Jan = Jan + 1
        }
        if(monthName == "Feb"){
            Feb = Feb + 1
        }
        if(monthName == "Mar"){
            Mar = Mar + 1
        }
        if(monthName == "Apr"){
            Apr = Apr + 1
        }
        if(monthName == "May"){
            May = May + 1
        }
        if(monthName == "Jun"){
            Jun = Jun + 1
        }
        if(monthName == "Jul"){
            Jul = Jul + 1
        }
        if(monthName == "Aug"){
            Aug = Aug + 1 
        }
        if(monthName == "Sep"){
            Sep = Sep + 1
        }
        if(monthName == "Oct"){
            Oct = Oct + 1
        }
        if(monthName == "Nov"){
            Nov = Nov + 1
        }
        if(monthName == "Dec"){
            Dec = Dec + 1
        }

    })
        new Chart(document.getElementById("chartjs-dashboard-bar"), {
            type: "bar",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: "This year",
                    backgroundColor: window.theme.primary,
                    borderColor: window.theme.primary,
                    hoverBackgroundColor: window.theme.primary,
                    hoverBorderColor: window.theme.primary,
                    data: [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec],
                    barPercentage: .75,
                    categoryPercentage: .5
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        stacked: false,
                        ticks: {
                            stepSize: 20
                        }
                    }],
                    xAxes: [{
                        stacked: false,
                        gridLines: {
                            color: "transparent"
                        }
                    }]
                }
            }
        });
})

data.movement().then(data => {
    
        let Jan = 0
        let Feb = 0
        let Mar = 0
        let Apr = 0
        let May = 0
        let Jun = 0
        let Jul = 0 
        let Aug = 0
        let Sep = 0
        let Oct = 0
        let Nov = 0
        let Dec = 0
    
        data.forEach(time => {
            let monthName = String(time).split(" ")[1]
            if(monthName == "Jan"){
                Jan = Jan + 1
            }
            if(monthName == "Feb"){
                Feb = Feb + 1
            }
            if(monthName == "Mar"){
                Mar = Mar + 1
            }
            if(monthName == "Apr"){
                Apr = Apr + 1
            }
            if(monthName == "May"){
                May = May + 1
            }
            if(monthName == "Jun"){
                Jun = Jun + 1
            }
            if(monthName == "Jul"){
                Jul = Jul + 1
            }
            if(monthName == "Aug"){
                Aug = Aug + 1 
            }
            if(monthName == "Sep"){
                Sep = Sep + 1
            }
            if(monthName == "Oct"){
                Oct = Oct + 1
            }
            if(monthName == "Nov"){
                Nov = Nov + 1
            }
            if(monthName == "Dec"){
                Dec = Dec + 1
            }
        })
            var ctx = document.getElementById("chartjs-dashboard-line").getContext("2d");
            var gradient = ctx.createLinearGradient(0, 0, 0, 225);
            gradient.addColorStop(0, "rgba(215, 227, 244, 1)");
            gradient.addColorStop(1, "rgba(215, 227, 244, 0)");
            // Line chart
            new Chart(document.getElementById("chartjs-dashboard-line"), {
                type: "line",
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [{
                        label: "Visitor",
                        fill: true,
                        backgroundColor: gradient,
                        borderColor: window.theme.primary,
                        data: [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec],
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    tooltips: {
                        intersect: false
                    },
                    hover: {
                        intersect: true
                    },
                    plugins: {
                        filler: {
                            propagate: false
                        }
                    },
                    scales: {
                        xAxes: [{
                            reverse: true,
                            gridLines: {
                                color: "rgba(0,0,0,0.0)"
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                stepSize: 1000
                            },
                            display: true,
                            borderDash: [3, 3],
                            gridLines: {
                                color: "rgba(0,0,0,0.0)"
                            }
                        }]
                    }
                }
            });
})

// data.locations().then(data => {

//     var markers = [];
//     data.forEach(data => {
//         markers.push({
//             name : String(data.country),
//             coords : [data.lat,data.lon],
//         })
//     })

//     var map = new jsVectorMap({
//         map: "world",
//         selector: "#world_map",
//         zoomButtons: true,
//         markers: markers,
//         markerStyle: {
//             initial: {
//                 r: 9,
//                 strokeWidth: 7,
//                 stokeOpacity: .4,
//                 fill: window.theme.primary
//             },
//             hover: {
//                 fill: window.theme.primary,
//                 stroke: window.theme.primary
//             }
//         },
//         zoomOnScroll: false
//     });
//     window.addEventListener("resize", () => {
//         map.updateSize();
//     });

// })


data.earnings().then(data => {
    document.getElementById('earnings-txt').innerText = data
})

data.orders().then(data => {
    document.getElementById('orders-txt').innerHTML = data
})

data.pastaGraph().then(_data => {
    console.log("PASTA",_data)
    			// Pie chart
			new Chart(document.getElementById("chartjs-dashboard-pie"), {
				type: "pie",
				data: {
					labels: ["200", "401" , "404", "405"],
					datasets: [{
						data: [_data[200], _data[401] , _data[404], _data[405]],
						backgroundColor: [
							window.theme.primary,
                            window.theme.info,
							window.theme.warning,
							window.theme.danger
						],
						borderWidth: 5
					}]
				},
				options: {
					responsive: !window.MSInputMethodContext,
					maintainAspectRatio: false,
					legend: {
						display: false
					},
					cutoutPercentage: 75
				}
			});
            document.getElementById('200-txt').innerText = _data[200]
            document.getElementById('401-txt').innerText = _data[401]
            document.getElementById('404-txt').innerText = _data[404]
            document.getElementById('405-txt').innerText = _data[405]
})


const leftPaginate = document.getElementById('pagination-btn-left')
const midPaginate = document.getElementById('pagination-btn-middle')
const rightPaginate = document.getElementById('pagination-btn-right')
const allPaginationBtns = document.querySelectorAll('.pagination-btn')

allPaginationBtns.forEach(btn =>{
    btn.addEventListener('click',(e) => {
        document.getElementById('tables').innerHTML = ""
        allPaginationBtns.forEach(btn =>{btn.classList.remove('disabled');btn.classList.remove('active-btn')})
        let chosenPage = Number(e.target.innerHTML)
        let leftPaginateVal = Number(leftPaginate.innerText)
        let midPaginateVal = Number(midPaginate.innerText) 
        let rightPaginateVal = Number(rightPaginate.innerText) 


        const isThereData = getLatestProjects(chosenPage,10)
        console.log("DATA",isThereData)

        if(isThereData == false){
            return alert(`No Data in Page ${btn.innerText}`)
        }
        else{
            if(btn.getAttribute('filter-value') == "right" && (midPaginateVal !== pageLimit || rightPaginateVal !== pageLimit )){
                leftPaginate.innerText = leftPaginateVal + 1 
                midPaginate.innerText =  midPaginateVal + 1
                rightPaginate.innerText =  rightPaginateVal + 1
            }else if(btn.getAttribute('filter-value') == "left" && leftPaginateVal !== 1){
                if(btn.innerText == "3" || btn.innerText == "2" || btn.innerText == "1" ){
                    leftPaginate.innerText =  1 
                    midPaginate.innerText =  2
                    rightPaginate.innerText =  3            
                }
                else{
                    leftPaginate.innerText = leftPaginateVal - 1 
                    midPaginate.innerText =  midPaginateVal - 1
                    rightPaginate.innerText =  rightPaginateVal - 1
                }
            }
        }
    })
})
