import Bee, { Job } from 'bee-queue';
import PasswordRecovery from '../app/jobs/PasswordRecovery';
import redisConfig from '../config/redis';

const jobs = [PasswordRecovery];

class Queue {
  private queues: any;

  constructor() {
    this.queues = {};

    this.init();
  }

  init(): void {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue: any, job: Job): void {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue(): void {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('fail', this.handleFaliure).process(handle);
    });
  }

  handleFaliure(job: Job, err: any): void {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
