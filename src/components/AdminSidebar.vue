<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
   <div
      class="sidebar dark:bg-coal-600 bg-light border-r border-r-gray-200 dark:border-r-coal-100 fixed top-0 bottom-0 z-20 hidden lg:flex flex-col items-stretch shrink-0"
      data-drawer="true" data-drawer-class="drawer drawer-start top-0 bottom-0" data-drawer-enable="true|lg:false"
      id="sidebar">
      <div class="sidebar-header hidden lg:flex items-center relative justify-between px-3 lg:px-6 shrink-0"
         id="sidebar_header">
         <a class="dark:hidden" href="html/demo1.html"> 
            <img class="default-logo min-h-[22px] max-w-none" src="" />
            <img class="small-logo min-h-[22px] max-w-none" src="" />
         </a>
         <a class="hidden dark:block" href="html/demo1.html">
            <img class="default-logo min-h-[22px] max-w-none" src="/media/app/default-logo-dark.svg" />
            <img class="small-logo min-h-[22px] max-w-none" src="/media/app/mini-logo.svg" />
         </a>
         <button
            class="btn btn-icon btn-icon-md size-[30px] rounded-lg border border-gray-200 dark:border-gray-300 bg-light text-gray-500 hover:text-gray-700 toggle absolute left-full top-2/4 -translate-x-2/4 -translate-y-2/4"
            data-toggle="body" data-toggle-class="sidebar-collapse" id="sidebar_toggle">
            <i class="ki-filled ki-black-left-line toggle-active:rotate-180 transition-all duration-300">
            </i>
         </button>
      </div>
      <div class="sidebar-content flex grow shrink-0 py-5 pr-2" id="sidebar_content">
         <div class="scrollable-y-hover grow shrink-0 flex pl-2 lg:pl-5 pr-1 lg:pr-3" data-scrollable="true"
            data-scrollable-dependencies="#sidebar_header" data-scrollable-height="auto" data-scrollable-offset="0px"
            data-scrollable-wrappers="#sidebar_content" id="sidebar_scrollable">
            <div class="menu flex flex-col grow gap-0.5" data-menu="true" data-menu-accordion-expand-all="false"
               id="sidebar_menu">
               
               <div class="menu-item" data-menu-item-toggle="accordion" data-menu-item-trigger="click">
                  <router-link to="/dashboard">
                  <div
                     class="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                     tabindex="0">
                     <span class="menu-icon items-start text-gray-500 dark:text-gray-400 w-[20px]">
                        <i class="ki-filled ki-element-11 text-lg">
                        </i>
                     </span>
                     <span
                        class="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                        Dashboards
                     </span>
                  </div>
               </router-link>
                  <div class="menu-item" data-menu-item-toggle="accordion" data-menu-item-trigger="click">
                     <div
                        class="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                        tabindex="0">
                        <span class="menu-icon items-start text-gray-500 dark:text-gray-400 w-[20px]">
                           <i class="ki-filled ki-security-user text-lg">
                           </i>
                        </span>
                        <span
                           class="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                           Administration
                        </span>
                        <span class="menu-arrow text-gray-400 w-[20px] shrink-0 justify-end ml-1 mr-[-10px]">
                           <i class="ki-filled ki-plus text-2xs menu-item-show:hidden">
                           </i>
                           <i class="ki-filled ki-minus text-2xs hidden menu-item-show:inline-flex">
                           </i>
                        </span>
                     </div>
                     
                     <div
                        class="menu-accordion gap-0.5 pl-[10px] relative before:absolute before:left-[20px] before:top-0 before:bottom-0 before:border-l before:border-gray-200">
                        <div class="menu-item">
                           <a class="menu-link gap-[5px] pl-[10px] pr-[10px] py-[8px] border border-transparent items-center grow menu-item-active:bg-secondary-active dark:menu-item-active:bg-coal-300 dark:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active dark:hover:bg-coal-300 dark:hover:border-gray-100 hover:rounded-lg"
                              href="html/demo1/authentication/classic/sign-up.html" tabindex="0">
                              <span
                                 class="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary">
                              </span>
                              <span
                                 class="menu-title text-2sm font-medium text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                                 Sign Up
                              </span>
                           </a>
                        </div>

                        <div class="menu-item">
                           <a class="menu-link gap-[5px] pl-[10px] pr-[10px] py-[8px] border border-transparent items-center grow menu-item-active:bg-secondary-active dark:menu-item-active:bg-coal-300 dark:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active dark:hover:bg-coal-300 dark:hover:border-gray-100 hover:rounded-lg"
                              tabindex="0">
                              <span
                                 class="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary">
                              </span>
                              <span
                                 class="menu-title text-2sm font-medium text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                                 Check Email
                              </span>
                           </a>
                        </div>
                        <div class="menu-item" data-menu-item-toggle="accordion" data-menu-item-trigger="click">
                           <div
                              class="menu-link border border-transparent gap-[5px] pl-[10px] pr-[10px] py-[8px] grow cursor-pointer"
                              tabindex="0">
                              <span
                                 class="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary">
                              </span>
                              <span
                                 class="menu-title text-2sm font-medium mr-1 text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                                 Reset Password
                              </span>
                              <span class="menu-arrow text-gray-400 w-[20px] shrink-0 justify-end ml-1 mr-[-10px]">
                                 <i class="ki-filled ki-plus text-2xs menu-item-show:hidden">
                                 </i>
                                 <i class="ki-filled ki-minus text-2xs hidden menu-item-show:inline-flex">
                                 </i>
                              </span>
                           </div>
                           <div
                              class="menu-accordion gap-0.5 relative before:absolute before:left-[32px] pl-[22px] before:top-0 before:bottom-0 before:border-l before:border-gray-200">
                              <div class="menu-item">
                                 <a class="menu-link gap-[5px] pl-[10px] pr-[10px] py-[8px] border border-transparent items-center grow menu-item-active:bg-secondary-active dark:menu-item-active:bg-coal-300 dark:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active dark:hover:bg-coal-300 dark:hover:border-gray-100 hover:rounded-lg"
                                    href="html/demo1/authentication/classic/reset-password/enter-email.html"
                                    tabindex="0">
                                    <span
                                       class="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary">
                                    </span>
                                    <span
                                       class="menu-title text-2sm font-medium text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                                       Enter Email
                                    </span>
                                 </a>
                              </div>
                              <div class="menu-item">
                                 <a class="menu-link gap-[5px] pl-[10px] pr-[10px] py-[8px] border border-transparent items-center grow menu-item-active:bg-secondary-active dark:menu-item-active:bg-coal-300 dark:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active dark:hover:bg-coal-300 dark:hover:border-gray-100 hover:rounded-lg"
                                    href="html/demo1/authentication/classic/reset-password/check-email.html"
                                    tabindex="0">
                                    <span
                                       class="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary">
                                    </span>
                                    <span
                                       class="menu-title text-2sm font-medium text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                                       Check Email
                                    </span>
                                 </a>
                              </div>
                              <div class="menu-item">
                                 <a class="menu-link gap-[5px] pl-[10px] pr-[10px] py-[8px] border border-transparent items-center grow menu-item-active:bg-secondary-active dark:menu-item-active:bg-coal-300 dark:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active dark:hover:bg-coal-300 dark:hover:border-gray-100 hover:rounded-lg"
                                    href="html/demo1/authentication/classic/reset-password/change-password.html"
                                    tabindex="0">
                                    <span
                                       class="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary">
                                    </span>
                                    <span
                                       class="menu-title text-2sm font-medium text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                                       Change Password
                                    </span>
                                 </a>
                              </div>
                              <div class="menu-item">
                                 <a class="menu-link gap-[5px] pl-[10px] pr-[10px] py-[8px] border border-transparent items-center grow menu-item-active:bg-secondary-active dark:menu-item-active:bg-coal-300 dark:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active dark:hover:bg-coal-300 dark:hover:border-gray-100 hover:rounded-lg"
                                    href="html/demo1/authentication/classic/reset-password/password-changed.html"
                                    tabindex="0">
                                    <span
                                       class="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary">
                                    </span>
                                    <span
                                       class="menu-title text-2sm font-medium text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                                       Password is Changed
                                    </span>
                                 </a>
                              </div>
                           </div>
                        </div>         
                     </div>
                     <router-link to="/schedule">
                     <div class="menu-item" data-menu-item-toggle="accordion" data-menu-item-trigger="click">
                        <div
                           class="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                           tabindex="0">
                           <span class="menu-icon items-start text-gray-500 dark:text-gray-400 w-[20px]">
                              <i class="ki-filled ki-setting-2 text-lg">
                              </i>
                           </span>
                           <span
                              class="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                              Schedule 
                           </span>
                        </div>
                     </div>
                  </router-link>
                  </div>
               </div>
               <div class="menu-item pt-2.25 pb-px">
                  <span class="menu-heading uppercase pl-[10px] pr-[10px] text-2sm font-semibold text-gray-500">
                     Users Accounts
                  </span>
               </div>

               <div class="menu-item" data-menu-item-toggle="accordion" data-menu-item-trigger="click">
                  <div
                     class="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                     tabindex="0">
                     <span class="menu-icon items-start text-gray-500 dark:text-gray-400 w-[20px]">
                        <i class="ki-filled ki-security-user text-lg">
                        </i>
                     </span>
                     <span
                        class="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                        Staff
                     </span>
                     <span class="menu-arrow text-gray-400 w-[20px] shrink-0 justify-end ml-1 mr-[-10px]">
                        <i class="ki-filled ki-plus text-2xs menu-item-show:hidden">
                        </i>
                        <i class="ki-filled ki-minus text-2xs hidden menu-item-show:inline-flex">
                        </i>
                     </span>
                  </div>
                 
                  <div
                     class="menu-accordion gap-0.5 pl-[10px] relative before:absolute before:left-[20px] before:top-0 before:bottom-0 before:border-l before:border-gray-200">
                   <router-link to="/staffAccount">
                        <div
                           class="menu-link border border-transparent gap-[14px] pl-[10px] pr-[10px] py-[8px] grow cursor-pointer"
                           tabindex="0">
                           <span
                              class="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary">
                           </span>
                           <span
                              class="menu-title text-2sm font-medium mr-1 text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                              Accounts
                           </span>  
                        </div>
                     </router-link>
                     <router-link to="/staffSchedule">
                        <div
                        class="menu-link border border-transparent gap-[14px] pl-[10px] pr-[10px] py-[8px] grow cursor-pointer"
                        tabindex="0">
                        <span
                           class="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary">
                        </span>
                        <span
                           class="menu-title text-2sm font-medium mr-1 text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                           Schedule  
                        </span>
                     </div>
                   </router-link>
               </div>
            </div>
               <div class="menu-item" data-menu-item-toggle="accordion" data-menu-item-trigger="click">
                  <div
                      class="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                     tabindex="0">
                     <span class="menu-icon items-start text-gray-500 dark:text-gray-400 w-[20px]">
                        <i class="ki-filled ki-security-user text-lg">
                        </i>
                     </span>
                     <span
                        class="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                        Members
                     </span>
                     <span class="menu-arrow text-gray-400 w-[20px] shrink-0 justify-end ml-1 mr-[-10px]">
                        <i class="ki-filled ki-plus text-2xs menu-item-show:hidden">
                        </i>
                        <i class="ki-filled ki-minus text-2xs hidden menu-item-show:inline-flex">
                        </i>
                     </span>
                  </div>

                  <div
                     class="menu-accordion gap-0.5 pl-[10px] relative before:absolute before:left-[20px] before:top-0 before:bottom-0 before:border-l before:border-gray-200">
                    <div class="menu-item" >
                  <router-link to="/membersAccount">
                        <div
                           class="menu-link border border-transparent gap-[14px] pl-[10px] pr-[10px] py-[8px] grow cursor-pointer"
                           tabindex="0">
                           <span
                              class="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary">
                           </span>
                           <span
                              class="menu-title text-2sm font-medium mr-1 text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                              Accounts
                           </span> 
                        </div>
                        </router-link>
                        <router-link to="/subscription">
                        <div
                           class="menu-link border border-transparent gap-[14px] pl-[10px] pr-[10px] py-[8px] grow cursor-pointer"
                           tabindex="0">
                           <span
                              class="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary">
                           </span>
                           <span
                              class="menu-title text-2sm font-medium mr-1 text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                              Subscription
                           </span>
                        </div>
                     </router-link>
                        <router-link to="/billing">
                        <div
                           class="menu-link border border-transparent gap-[14px] pl-[10px] pr-[10px] py-[8px] grow cursor-pointer"
                           tabindex="0">
                           <span
                              class="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary">
                           </span>
                           <span
                              class="menu-title text-2sm font-medium mr-1 text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                             Billing
                           </span>    
                        </div>
                     </router-link>

                        <router-link to="/memberSchedule">
                        <div
                           class="menu-link border border-transparent gap-[14px] pl-[10px] pr-[10px] py-[8px] grow cursor-pointer"
                           tabindex="0">
                           <span
                              class="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary">
                           </span>
                           <span
                              class="menu-title text-2sm font-medium mr-1 text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                              Schedule
                           </span> 
                        </div>
                     </router-link>

                     </div>
                  </div>
               </div>


               <div class="menu-item pt-2.25 pb-px">
                  <span class="menu-heading uppercase pl-[10px] pr-[10px] text-2sm font-semibold text-gray-500">
                     Apps
                  </span>
               </div>
               <div class="menu-item" data-menu-item-toggle="accordion" data-menu-item-trigger="click">
                  <div
                     class="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                     tabindex="0">
                     <span class="menu-icon items-start text-gray-500 dark:text-gray-400 w-[20px]">
                        <i class="ki-filled ki-element-11 text-lg">
                        </i>
                     </span>
                     <span
                        class="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                        Products
                     </span>
                     <span class="menu-arrow text-gray-400 w-[20px] shrink-0 justify-end ml-1 mr-[-10px]">
                        <i class="ki-filled ki-plus text-2xs menu-item-show:hidden">
                        </i>
                        <i class="ki-filled ki-minus text-2xs hidden menu-item-show:inline-flex">
                        </i>
                     </span>

                  </div>
                  <div
                     class="menu-accordion gap-0.5 pl-[10px] relative before:absolute before:left-[20px] before:top-0 before:bottom-0 before:border-l before:border-gray-200">
                     <router-link to="/equipments">
                     <div class="menu-item">
                        <a class="menu-link gap-[5px] pl-[10px] pr-[10px] py-[8px] border border-transparent items-center grow menu-item-active:bg-secondary-active dark:menu-item-active:bg-coal-300 dark:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active dark:hover:bg-coal-300 dark:hover:border-gray-100 hover:rounded-lg"
                           href="html/demo1/authentication/classic/reset-password/password-changed.html" tabindex="0">
                           <span
                              class="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary">
                           </span>
                           <span
                              class="menu-title text-2sm font-medium text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                              Equipments
                           </span>
                        </a>
                     </div>
                  </router-link>
                  <router-link to="/gymwears">
                     <div class="menu-item">
                        <a class="menu-link gap-[5px] pl-[10px] pr-[10px] py-[8px] border border-transparent items-center grow menu-item-active:bg-secondary-active dark:menu-item-active:bg-coal-300 dark:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active dark:hover:bg-coal-300 dark:hover:border-gray-100 hover:rounded-lg"
                           href="html/demo1/authentication/classic/reset-password/password-changed.html" tabindex="0">
                           <span
                              class="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary">
                           </span>
                           <span
                              class="menu-title text-2sm font-medium text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                              Gym wears
                           </span>
                        </a>
                     </div>
                  </router-link>
                     <router-link to="/supplement">
                     <div class="menu-item">
                        <a class="menu-link gap-[5px] pl-[10px] pr-[10px] py-[8px] border border-transparent items-center grow menu-item-active:bg-secondary-active dark:menu-item-active:bg-coal-300 dark:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active dark:hover:bg-coal-300 dark:hover:border-gray-100 hover:rounded-lg"
                           href="html/demo1/authentication/classic/reset-password/password-changed.html" tabindex="0">
                           <span
                              class="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary">
                           </span>
                           <span
                              class="menu-title text-2sm font-medium text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                              Supplements
                           </span>
                        </a>
                     </div>
                  </router-link>
                  </div>

               </div>
               <div class="menu-item" data-menu-item-toggle="accordion" data-menu-item-trigger="click">
                  <router-link to="/sales">
                  
                  <div
                     class="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                     tabindex="0">
                     <span class="menu-icon items-start text-gray-500 dark:text-gray-400 w-[20px]">
                        <i class="ki-filled ki-element-11 text-lg">
                        </i>
                     </span>
                     <span
                        class="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                        Sales
                     </span>
                  </div>
               </router-link> 
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script setup lang="ts">


</script>