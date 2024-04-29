import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat/app';
import { switchMap, map } from 'rxjs/operators';
import { Project, Story } from './project.model';
import {
  getFirestore,
  doc,
  updateDoc,
  arrayRemove,
  writeBatch,
  collection,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  /**
   * Creates a new project for the current user
   */
  async createProject(data: Project) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('projects').add({
      ...data,
      uid: user?.uid,
      stories: [{ description: 'It`s welcome todo story!', label: 'grey', status: 'todo'}],
    });
  }

  /**
   * Delete project
   */
  deleteProject(projectId: string) {
    return this.db.collection('projects').doc(projectId).delete();
  }

  /**
   * Updates the stories on the project
   */
  updateStory(projectId: string, stories: Story[]) {
    return this.db.collection('projects').doc(projectId).update({ stories });
  }

  /**
   * Remove a story from the project
   */
  removeStory(projectId: string, story: Story) {
    const db = getFirestore();
    return updateDoc(doc(db, 'projects', projectId), {
      stories: arrayRemove(story),
    });
  }

  /**
   * Get all projects owned by current user
   */
  getProjects() {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Project>('projects', (ref) =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }

  /**
   * Run a batch write to change the priority of each project for sorting
   */
  sortProjects(projects: Project[]) {
    const db = getFirestore();
    const batch = writeBatch(db);
    const refs = projects.map((p) => doc(collection(db, 'projects'), p.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }
}
