import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostProfilePage } from './post-profile.page';

describe('PostProfilePage', () => {
  let component: PostProfilePage;
  let fixture: ComponentFixture<PostProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PostProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
