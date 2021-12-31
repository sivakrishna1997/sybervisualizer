function toggleSidenav() {
    var sidebarMenu = document.getElementById('sidebarMenu');
    var mainFrame = document.getElementById('mainFrame');
    var sidenavtoggle = document.getElementById('sidenavtoggle');
    
    sidebarMenu.classList.toggle('d-none');
    mainFrame.classList.toggle('col-md-12');
    mainFrame.classList.toggle('col-lg-12');
    mainFrame.classList.toggle('ps-4');
    mainFrame.classList.toggle('ps-3');
    sidenavtoggle.classList.toggle('sidenavtoggleLeft');
}