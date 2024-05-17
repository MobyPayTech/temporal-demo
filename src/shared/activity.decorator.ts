import { SetMetadata } from '@nestjs/common';

export const TEMPORAL_ACTIVITY = 'TEMPORAL_ACTIVITY';
export interface ActivityOptions {
  name?: string;
}

export function Activity(): MethodDecorator;
export function Activity(name: string): MethodDecorator;
export function Activity(options: ActivityOptions): MethodDecorator;
export function Activity(
  nameOrOptions?: string | ActivityOptions,
): MethodDecorator {
  const options =
    nameOrOptions && typeof nameOrOptions === 'object'
      ? nameOrOptions
      : { name: nameOrOptions };

  return SetMetadata(TEMPORAL_ACTIVITY, options || {});
}
