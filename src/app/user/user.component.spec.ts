import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { DataService } from '../shared/data.service';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should have user name value undefined', () => {
  //   expect(component.user.name).toEqual('sanchit')
  // })

  it("should have user name if user logged in", () => {
    let compiled = fixture.debugElement.nativeElement as HTMLElement;
    component.isLoggedIn = true;
    fixture.detectChanges();
    expect(compiled.querySelector('p')?.textContent).toContain(component.user.name);
  })

  it("should not have user name if user not logged in", () => {
    let compiled = fixture.debugElement.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).not.toContain(component.user.name);
  })

  it("checking user service", () => {
    let userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(component.user.name).toEqual(userService.user.name);
  })

  it("checking async functionality", () => {
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
    expect(component.data).toBe('');
  })

  it("checking async functionality", fakeAsync(() => {
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    tick();
    expect(component.data).toBe('Data');
    // fixture.whenStable().then(() => {
    // });
  }))
});
