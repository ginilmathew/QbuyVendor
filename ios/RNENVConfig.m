#import "RNENVConfig.h"
@implementation RNENVConfig
RCT_EXPORT_MODULE();
- (NSDictionary *)constantsToExport
{
#if DEV
NSString *env=@"dev";
#elif UAT
NSString *env=@"uat";
#else
NSString *env=@"prod";
#endif
return @{ @"env": env };
}
+ (BOOL)requiresMainQueueSetup{
return YES;
}
@end
