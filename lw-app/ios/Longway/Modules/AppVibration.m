//
//  Vibration.m
//  Vekaz
//
//  Created by Long Nguyen on 3/20/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AudioToolbox/AudioToolbox.h>
#import "AppVibration.h"

@implementation AppVibration

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(vibrate) {
  AudioServicesPlaySystemSound(1520);
  AudioServicesPlaySystemSound(1520);
  AudioServicesPlaySystemSound(1520);
}

@end
 
