import { MockUserService } from './MockUserService';
import { ILoginUser } from './../../models/ILoginUser';
import { CommonModule } from '@angular/common';
import { UsersService } from './../../services/users.service';
import { AuthenticationModule } from './../../modules/authentication/authentication.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginComponent } from './login.component';

const h2Content = 'Login';
const numberOfLabels = 2;
const numberOfInputs = 3; // submit button is also input type
const usernameLabelContent = 'Username*';
const passwordLabelContent = 'Password*';

describe('LoginComponent', () => {
  let mockService: MockUserService;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    mockService = new MockUserService();

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, AuthenticationModule ],
      declarations: [],
      providers: [{provide: UsersService, useValue: mockService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have h1 tag', () => {
    const debugH2Element = fixture.debugElement.query(By.css('h1'));
    const htmlH2Element = debugH2Element.nativeElement;
    expect(htmlH2Element).toBeTruthy();
  });

  it('should have h1 text correct', () => {
    const debugH2Element = fixture.debugElement.query(By.css('h1'));
    const htmlH2Element = debugH2Element.nativeElement;
    expect(htmlH2Element.textContent).toEqual(h2Content);
  });

  it('should have correct number of labels', () => {
    const debugLabelElements = fixture.debugElement.queryAll(By.css('label'));
    expect(debugLabelElements.length).toEqual(numberOfLabels);
  });

  it('should have correct labels content', () => {
    const debugLabelElements = fixture.debugElement.queryAll(By.css('label'));
    const usernameLabel = debugLabelElements[0].nativeElement;
    const passwordLabel = debugLabelElements[1].nativeElement;

    expect(usernameLabel.textContent).toEqual(usernameLabelContent);
    expect(passwordLabel.textContent).toEqual(passwordLabelContent);
  });

  it('should have correct number of inputs', () => {
    const debugInputElements = fixture.debugElement.queryAll(By.css('input'));
    expect(debugInputElements.length).toEqual(numberOfInputs);
  });

  it('should have correct inputs attributes', () => {
    const debugLabelElements = fixture.debugElement.queryAll(By.css('input'));
    const usernameInput: HTMLElement = debugLabelElements[0].nativeElement;
    const passwordInput: HTMLElement = debugLabelElements[1].nativeElement;
    const buttonInput: HTMLElement = debugLabelElements[2].nativeElement;

    expect(usernameInput.getAttribute('type')).toEqual('text');
    expect(passwordInput.getAttribute('type')).toEqual('password');
    expect(buttonInput.getAttribute('type')).toEqual('submit');
    expect(buttonInput.getAttribute('value')).toEqual('Login');
  });

  it('should show invalid credentials message on wrong login', () => {
    const user: ILoginUser = {
      username: 'test',
      password: '123'
    };
    component.login(user);
    fixture.detectChanges();

    const debugErrorElement: DebugElement = fixture.debugElement.query(By.css('.validationError'));
    const htmlErrorElement: HTMLElement = debugErrorElement.nativeElement;

    expect(htmlErrorElement.textContent).toEqual(MockUserService.errorMessage);
  });
});
