import { fetchSection } from "./components/scripts/include.js";
import { createDonutProgress } from "./components/scripts/createDonutProgress.js";
import { initSidebar } from "./components/scripts/sidebar.js";

window.addEventListener("DOMContentLoaded", async () => {
    await fetchSection("sidebar-container", "components/partials/sidebar.html");
    await fetchSection("footer-container", "components/partials/footer.html");
    await fetchSection("breadcrumbs-container", "components/partials/breadcrumbs.html");

    initSidebar();

    document.querySelectorAll(".progress-bar").forEach((bar) => {
        const value = bar.dataset.progress;
        const inner = bar.querySelector(".inner-bar");
        if (value && inner) {
            inner.style.width = "0%";
            inner.classList.add("transition-all", "duration-1000", "ease-out");
            setTimeout(() => {
                inner.style.width = `${value}%`;
            }, 50);
        }
    });

    const barOptions = {
        chart: {
            type: 'bar',
            height: 200,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                columnWidth: '7px',
                borderRadius: 3,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            labels: { show: false },
            axisTicks: { show: false },
            axisBorder: { show: false },
        },
        yaxis: {
            min: 0,
            max: 500,
            tickAmount: 5,
            labels: {
                offsetX: -10,
                style: {
                    fontWeight: 400,
                    fontSize: '10px',
                    colors: '#FFFFFF',
                }
            }
        }
        ,
        tooltip: {
            theme: 'dark'
        },
        grid: {
            show: false
        },
        colors: ['#FFFFFF'],
        series: [{
            name: 'Sales',
            data: [100, 150, 80, 200, 120, 180, 500, 220, 140]
        }]
    };

    const barChart = new ApexCharts(document.querySelector("#bar-chart"), barOptions);
    barChart.render();

    const lineOptions = {
        chart: {
            type: 'area',
            height: 350,
            toolbar: { show: false },
            animations: { enabled: true },
            zoom: { enabled: false },
            foreColor: '#CBD5E0',
        }, dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        series: [
            {
                name: 'Series 1',
                data: [100, 180, 290, 160, 380, 480, 260, 440, 400, 350, 280, 230]
            },
            {
                name: 'Series 2',
                data: [500, 200, 320, 180, 250, 150, 200, 100, 120, 280, 200, 250]
            }
        ],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: {
                    fontSize: '10px',
                    fontWeight: 700,
                    fontFamily: 'Helvetica',
                }
            }
        },
        yaxis: {
            min: 0,
            max: 500,
            tickAmount: 5,
            labels: {
                offsetX: -10,
                style: {
                    fontSize: '10px',
                    fontWeight: 700,
                    fontFamily: 'Helvetica',
                }
            }
        },
        grid: {
            borderColor: '#56577A',
            strokeDashArray: 3.5
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.5,
                opacityTo: 0.1,
                stops: [0, 100],
                colorStops: [
                    [
                        { offset: 0, color: '#0075FF', opacity: 1 },
                        { offset: 100, color: '#0075FF', opacity: 0 }
                    ],
                    [
                        { offset: 0, color: 'rgba(44, 217, 255, 0.36)', opacity: 0.36 },
                        { offset: 100, color: 'rgba(44, 217, 255, 0.1)', opacity: 0 }
                    ]
                ]
            }
        },
        colors: ['#0075FF', '#2CD9FF'],
        tooltip: {
            shared: true,
            intersect: false,
            x: { show: true },
        },
        markers: {
            size: 0
        },
        legend: {
            show: false
        }
    };

    const lineChart = new ApexCharts(document.querySelector("#line-chart"), lineOptions);
    lineChart.render();

    createDonutProgress(document.getElementById("blue-donut"), {
        percent: 0.70,
        showBg: true,
        bgColor: "#22234B",
        gradientStops: [
            { stop: 0, color: "rgba(0, 117, 255, 0)" },
            { stop: 0.1, color: "rgba(0, 117, 255, 0)" },
            { stop: 0.25, color: "rgba(0, 117, 255, 0)" },
            { stop: 0.5, color: "#0075FF" },
            { stop: 1, color: "#0075FF" }
        ]
    });

    createDonutProgress(document.getElementById("green-donut"), {
        percent: 0.70,
        showBg: false,
        gradientStops: [
            { stop: 0, color: "rgba(5, 205, 153, 0)" },
            { stop: 0.1, color: "rgba(5, 205, 153, 0)" },
            { stop: 0.25, color: "rgba(5, 205, 153, 0.3)" },
            { stop: 0.5, color: "#05CD99" },
            { stop: 1, color: "#05CD99" }
        ]
    });
});