import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { NotFoundComponent } from './not-found.component';

const h2Content = 'Sorry the page you are looking for is invalid.';
const imgSrcAttribute = 'http://beloweb.ru/wp-content/uploads/2015/02/545454118.jpg';
const imgAltAttribute = '404';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  let debugH2Element: DebugElement;
  let htmlH2Element: HTMLElement;

  let debugImgElement: DebugElement;
  let htmlImgElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;

    debugH2Element = fixture.debugElement.query(By.css('h2'));
    htmlH2Element = debugH2Element.nativeElement;

    debugImgElement = fixture.debugElement.query(By.css('img'));
    htmlImgElement = debugImgElement.nativeElement;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have information tag', () => {
    expect(htmlH2Element).toBeTruthy();
  });

  it('should have correct information text', () => {
    expect(htmlH2Element.textContent).toEqual(h2Content);
  });

  it('should have img tag', () => {
    expect(htmlImgElement).toBeTruthy();
  });

  it('should have correct img source attribute', () => {
    expect(htmlImgElement.getAttribute('src')).toEqual(imgSrcAttribute);
  });

  it('should have correct img alt attribute', () => {
    expect(htmlImgElement.getAttribute('alt')).toEqual(imgAltAttribute);
  });
});
