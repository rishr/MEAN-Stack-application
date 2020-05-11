import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDownloadComponent } from './user-download.component';

describe('UserDownloadComponent', () => {
  let component: UserDownloadComponent;
  let fixture: ComponentFixture<UserDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
