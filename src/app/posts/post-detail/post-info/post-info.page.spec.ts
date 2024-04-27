import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostInfoPage } from './post-info.page';

describe('PostInfoPage', () => {
  let component: PostInfoPage;
  let fixture: ComponentFixture<PostInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PostInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
