import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostCommentsPage } from './post-comments.page';

describe('PostCommentsPage', () => {
  let component: PostCommentsPage;
  let fixture: ComponentFixture<PostCommentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
