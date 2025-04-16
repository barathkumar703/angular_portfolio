import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';

declare var mixitup: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, CarouselModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = "Barath's PortFolio";

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  /*============ MENU ============*/

  isMenuOpen = false; // Track menu state

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /*============ REMOVE MENU MOBILE ============*/


  onNavLinkClick(section: string) {
    this.isMenuOpen = false;
    this.activeSection = section;
  }

  /*============ CHANGE BACKGROUND HEADER ============*/

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.getElementById('header');
    if (header) {
      if (window.scrollY >= 20) {
        header.classList.add('bg-header');
      } else {
        header.classList.remove('bg-header');
      }
    }
  }

  /*============ SCROLL SECTIONS ACTIVE LINK ============*/

  activeSection: string = 'home'; // default active

  // onNavLinkClick(section: string): void {
  //   this.activeSection = section;
  // }

  
  navLinks = [
    { label: 'Home', section: 'home' },
    { label: 'Services', section: 'services' },
    { label: 'About Me', section: 'about' },
    { label: 'Skills', section: 'skills' },
    { label: 'Works', section: 'works' },
    { label: 'Resume', section: 'resume' },
    { label: 'Contact', section: 'contact' }
  ];
  

  /*============ SERVICES SWIPER ============*/

  servicesCarouselOptions = {
    loop: true,
    margin: 32,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1208: {
        items: 3
      }
    }
  };

  /*============ MIXITUP FILTER PORTFOLIO ============*/

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const container = document.querySelector('#work-container');

      if (container) {
        const mixer = mixitup(container, {
          selectors: {
            target: '.mix'
          },
          animation: {
            duration: 300
          }
        });
      }
    }
  }

  activeFilter: string = 'all';

  onFilterClick(filter: string): void {
    this.activeFilter = filter;
  }


  /*============ RESUME ============*/

  openedIndex: string | null = null;

  educationList = [
    {
      institution: 'Sri Krishna Arts & Science College',
      title: 'Bsc Computer Technology',
      date: '2019 - 2022',
      description: "I hold a Bachelor's degree from SKASC with an aggregate of 75%."
    },
    {
      institution: 'GKD Matric Hr.sec School',
      title: 'HSC',
      date: '2018 - 2019',
      description: 'Completed Higher Secondary Education under the State Board with 59% marks.'
    },
    {
      institution: 'Bishop Francis Matric School',
      title: 'SSLC',
      date: '2015 - 2016',
      description: 'Successfully completed SSLC under State Board in 2016, securing 90.2% marks.'
    }
  ];

  experienceList = [
    {
      position: 'Frontend Developer',
      company: 'Hawkeye Digitech',
      date: '2023 - Present',
      description: 'Worked as Frontend Developer for this project. Using HTML, CSS, JavaScript and Angular Framework.'
    },
    {
      position: 'Frontend Developer',
      company: 'Hawkeye Digitech',
      date: '2023 - Present',
      description: 'Worked as Frontend Developer for this project. Using HTML, CSS, JavaScript and Angular Framework.'
    },
    {
      position: 'Assistant Cinematographer',
      company: '',
      date: '2022 - 2023',
      description: 'An assistant cinematographer supports the director of photography in setting up camera equipment, managing lenses, and ensuring smooth operation on set.'
    }
  ];

  toggleAccordion(index: string) {
    this.openedIndex = this.openedIndex === index ? null : index;
  }

  /*============ EMAIL JS ============*/

  /*============ STYLE SWITCHER ============*/

  settingsOpen = false;

  toggleSettings() {
    this.settingsOpen = !this.settingsOpen
  }

  hues: number[] = [165, 260, 345, 65, 15];
  selectedHue: number = 165; // default selected color

  setHue(hue: number): void {
    this.selectedHue = hue;
    document.documentElement.style.setProperty('--hue', hue.toString());
  }

  /*****Switcher Show*****/

  /*****Switcher Hidden *****/

  /*============ THEME COLORS ============*/

  /*============ LIGHT/DARK MODE  ============*/

  currentTheme: string = 'light';

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      this.currentTheme = savedTheme || 'light';
      document.body.className = this.currentTheme;
    }
  }

  onThemeChange() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.className = this.currentTheme;
      localStorage.setItem('theme', this.currentTheme);
    }
  }
}
