import type { CrashReporter } from './crashReporter.js';

export interface CrashReporterUser {
  id?: number | string;
  email?: string;
  displayName?: string;
}

export type CrashReporterEvent =
  | CrashReporterEvent.Initialize
  | CrashReporterEvent.UpdateUser
  | CrashReporterEvent.UpdateVersion
  | CrashReporterEvent.CaptureError;

export namespace CrashReporterEvent {
  export interface Initialize {
    _: 'Initialize';
    instance: CrashReporter;
  }
  export function Initialize(properties: Omit<Initialize, '_'>): Initialize {
    return {
      _: Initialize.typeName,
      ...properties,
    };
  }
  Initialize.typeName = 'Initialize' as const;

  export interface UpdateVersion {
    _: 'UpdateVersion';
    version: string;
    instance: CrashReporter;
  }
  export function UpdateVersion(properties: Omit<UpdateVersion, '_'>): UpdateVersion {
    return {
      _: UpdateVersion.typeName,
      ...properties,
    };
  }
  UpdateVersion.typeName = 'UpdateVersion' as const;

  export interface UpdateUser {
    _: 'UpdateUser';
    user: CrashReporterUser | undefined;
    instance: CrashReporter;
  }
  export function UpdateUser(properties: Omit<UpdateUser, '_'>): UpdateUser {
    return {
      _: UpdateUser.typeName,
      ...properties,
    };
  }
  UpdateUser.typeName = 'UpdateUser' as const;

  export interface CaptureError {
    _: 'CaptureError';
    error: unknown;
    tags: CrashReporter.TagSet;
    instance: CrashReporter;
  }
  export function CaptureError(properties: Omit<CaptureError, '_'>): CaptureError {
    return {
      _: CaptureError.typeName,
      ...properties,
    };
  }
  CaptureError.typeName = 'CaptureError' as const;
}
