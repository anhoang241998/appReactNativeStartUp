/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <AudioToolbox/AudioToolbox.h>

@import Firebase;

#import "RNFirebaseNotifications.h" //Add This Line

#import <RNCPushNotificationIOS.h>
#import <UserNotifications/UserNotifications.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
//  [AppDelegate initializeFlipper:application];
  
//  NSURL *jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.bundle?platform=ios&dev=true&minify=false"];
//  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
//         moduleName:@"Vekaz"
//  initialProperties:nil
//      launchOptions:launchOptions];
  
  [FIRApp configure];
  [RNFirebaseNotifications configure];  //Add This Line
  
//  NSBundle *bundle = [NSBundle mainBundle];
//  NSDictionary *info = [bundle infoDictionary];
//  NSString *moduleName = [info objectForKey:@"CFBundleDisplayName"];
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"Longway"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  
  [UIApplication sharedApplication].applicationIconBadgeNumber = 0;
  
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  UIView* launchScreenView = [[[NSBundle mainBundle] loadNibNamed:@"LaunchScreen" owner:self options:nil] objectAtIndex:0];
  launchScreenView.frame = self.window.bounds;
  rootView.loadingView = launchScreenView;
  
  return YES;
}

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  [[RNFirebaseNotifications instance] didReceiveLocalNotification:notification];
}

//// Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {

  NSLog( @"Here handle push notification in foreground" );

  completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
//
//+ (void) initializeFlipper:(UIApplication *)application
//{
//#if DEBUG
//#ifdef FB_SONARKIT_ENABLED
//  FlipperClient *client = [FlipperClient sharedClient];
//  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
//  [client addPlugin: [[FlipperKitLayoutPlugin alloc] initWithRootNode: application withDescriptorMapper: layoutDescriptorMapper]];
//  [client addPlugin: [[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
//  [client addPlugin: [FlipperKitReactPlugin new]];
//  [client addPlugin: [[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
//  [client start];
//#endif
//#endif
//}

@end
