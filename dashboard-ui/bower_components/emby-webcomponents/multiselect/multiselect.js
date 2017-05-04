define(["browser","appStorage","apphost","loading","connectionManager","globalize","embyRouter","dom","css!./multiselect"],function(browser,appStorage,appHost,loading,connectionManager,globalize,embyRouter,dom){"use strict";function hideSelections(){var selectionCommandsPanel=currentSelectionCommandsPanel;if(selectionCommandsPanel){selectionCommandsPanel.parentNode.removeChild(selectionCommandsPanel),currentSelectionCommandsPanel=null,selectedItems=[],selectedElements=[];for(var elems=document.querySelectorAll(".itemSelectionPanel"),i=0,length=elems.length;i<length;i++){var parent=elems[i].parentNode;parent.removeChild(elems[i]),parent.classList.remove("withMultiSelect")}}}function onItemSelectionPanelClick(e,itemSelectionPanel){if(!dom.parentWithClass(e.target,"chkItemSelect")){var chkItemSelect=itemSelectionPanel.querySelector(".chkItemSelect");if(chkItemSelect)if(chkItemSelect.classList.contains("checkedInitial"))chkItemSelect.classList.remove("checkedInitial");else{var newValue=!chkItemSelect.checked;chkItemSelect.checked=newValue,updateItemSelection(chkItemSelect,newValue)}}return e.preventDefault(),e.stopPropagation(),!1}function updateItemSelection(chkItemSelect,selected){var id=dom.parentWithAttribute(chkItemSelect,"data-id").getAttribute("data-id");if(selected){var current=selectedItems.filter(function(i){return i===id});current.length||(selectedItems.push(id),selectedElements.push(chkItemSelect))}else selectedItems=selectedItems.filter(function(i){return i!==id}),selectedElements=selectedElements.filter(function(i){return i!==chkItemSelect});if(selectedItems.length){var itemSelectionCount=document.querySelector(".itemSelectionCount");itemSelectionCount&&(itemSelectionCount.innerHTML=selectedItems.length)}else hideSelections()}function onSelectionChange(e){updateItemSelection(this,this.checked)}function showSelection(item,isChecked){var itemSelectionPanel=item.querySelector(".itemSelectionPanel");if(!itemSelectionPanel){itemSelectionPanel=document.createElement("div"),itemSelectionPanel.classList.add("itemSelectionPanel");var parent=item.querySelector(".cardBox")||item.querySelector(".cardContent");parent.classList.add("withMultiSelect"),parent.appendChild(itemSelectionPanel);var cssClass="chkItemSelect";isChecked&&!browser.firefox&&(cssClass+=" checkedInitial");var checkedAttribute=isChecked?" checked":"";itemSelectionPanel.innerHTML='<label class="checkboxContainer"><input type="checkbox" is="emby-checkbox" data-outlineclass="multiSelectCheckboxOutline" class="'+cssClass+'"'+checkedAttribute+"/><span></span></label>";var chkItemSelect=itemSelectionPanel.querySelector(".chkItemSelect");chkItemSelect.addEventListener("change",onSelectionChange)}}function showSelectionCommands(){var selectionCommandsPanel=currentSelectionCommandsPanel;if(!selectionCommandsPanel){selectionCommandsPanel=document.createElement("div"),selectionCommandsPanel.classList.add("selectionCommandsPanel"),document.body.appendChild(selectionCommandsPanel),currentSelectionCommandsPanel=selectionCommandsPanel;var html="";html+='<button is="paper-icon-button-light" class="btnCloseSelectionPanel autoSize"><i class="md-icon">close</i></button>',html+='<h1 class="itemSelectionCount"></h1>';var moreIcon="dots-horiz"===appHost.moreIcon?"&#xE5D3;":"&#xE5D4;";html+='<button is="paper-icon-button-light" class="btnSelectionPanelOptions autoSize" style="margin-left:auto;"><i class="md-icon">'+moreIcon+"</i></button>",selectionCommandsPanel.innerHTML=html,selectionCommandsPanel.querySelector(".btnCloseSelectionPanel").addEventListener("click",hideSelections);var btnSelectionPanelOptions=selectionCommandsPanel.querySelector(".btnSelectionPanelOptions");btnSelectionPanelOptions.addEventListener("click",showMenuForSelectedItems)}}function deleteItems(apiClient,itemIds){return new Promise(function(resolve,reject){var msg=globalize.translate("sharedcomponents#ConfirmDeleteItem"),title=globalize.translate("sharedcomponents#HeaderDeleteItem");itemIds.length>1&&(msg=globalize.translate("sharedcomponents#ConfirmDeleteItems"),title=globalize.translate("sharedcomponents#HeaderDeleteItems")),require(["confirm"],function(confirm){confirm(msg,title).then(function(){var promises=itemIds.map(function(itemId){apiClient.deleteItem(itemId)});Promise.all(promises).then(resolve)},reject)})})}function showMenuForSelectedItems(e){var apiClient=connectionManager.currentApiClient();apiClient.getCurrentUser().then(function(user){var menuItems=[];menuItems.push({name:globalize.translate("sharedcomponents#AddToCollection"),id:"addtocollection",ironIcon:"add"}),menuItems.push({name:globalize.translate("sharedcomponents#AddToPlaylist"),id:"playlist",ironIcon:"playlist-add"}),user.Policy.EnableContentDeletion&&menuItems.push({name:globalize.translate("sharedcomponents#Delete"),id:"delete",ironIcon:"delete"}),user.Policy.EnableContentDownloading&&appHost.supports("filedownload"),user.Policy.EnableContentDownloading&&menuItems.push({name:globalize.translate("sharedcomponents#DownloadToOtherDevice"),id:"sync"}),menuItems.push({name:globalize.translate("sharedcomponents#GroupVersions"),id:"groupvideos",ironIcon:"call-merge"}),user.Policy.EnableContentDownloading&&appHost.supports("sync")&&menuItems.push({name:globalize.translate("sharedcomponents#MakeAvailableOffline"),id:"synclocal"}),menuItems.push({name:globalize.translate("sharedcomponents#MarkPlayed"),id:"markplayed"}),menuItems.push({name:globalize.translate("sharedcomponents#MarkUnplayed"),id:"markunplayed"}),menuItems.push({name:globalize.translate("sharedcomponents#Refresh"),id:"refresh"}),require(["actionsheet"],function(actionsheet){actionsheet.show({items:menuItems,positionTo:e.target,callback:function(id){var items=selectedItems.slice(0),serverId=apiClient.serverInfo().Id;switch(id){case"addtocollection":require(["collectionEditor"],function(collectionEditor){(new collectionEditor).show({items:items,serverId:serverId})}),hideSelections(),dispatchNeedsRefresh();break;case"playlist":require(["playlistEditor"],function(playlistEditor){(new playlistEditor).show({items:items,serverId:serverId})}),hideSelections(),dispatchNeedsRefresh();break;case"delete":deleteItems(apiClient,items).then(function(){embyRouter.goHome()}),hideSelections(),dispatchNeedsRefresh();break;case"groupvideos":combineVersions(apiClient,items);break;case"markplayed":items.forEach(function(itemId){apiClient.markPlayed(apiClient.getCurrentUserId(),itemId)}),hideSelections(),dispatchNeedsRefresh();break;case"markunplayed":items.forEach(function(itemId){apiClient.markUnplayed(apiClient.getCurrentUserId(),itemId)}),hideSelections(),dispatchNeedsRefresh();break;case"refresh":require(["refreshDialog"],function(refreshDialog){new refreshDialog({itemIds:items,serverId:serverId}).show()}),hideSelections(),dispatchNeedsRefresh();break;case"sync":require(["syncDialog"],function(syncDialog){syncDialog.showMenu({items:items.map(function(i){return{Id:i}}),serverId:serverId})}),hideSelections(),dispatchNeedsRefresh();break;case"synclocal":require(["syncDialog"],function(syncDialog){syncDialog.showMenu({items:items.map(function(i){return{Id:i}}),isLocalSync:!0,serverId:serverId})}),hideSelections(),dispatchNeedsRefresh()}}})})})}function dispatchNeedsRefresh(){var elems=[];[].forEach.call(selectedElements,function(i){var container=dom.parentWithAttribute(i,"is","emby-itemscontainer");container&&elems.indexOf(container)===-1&&elems.push(container)});for(var i=0,length=elems.length;i<length;i++)elems[i].dispatchEvent(new CustomEvent("needsrefresh",{detail:{},cancelable:!1,bubbles:!0}))}function combineVersions(apiClient,selection){return selection.length<2?void require(["alert"],function(alert){alert({text:globalize.translate("sharedcomponents#PleaseSelectTwoItems")})}):(loading.show(),void apiClient.ajax({type:"POST",url:apiClient.getUrl("Videos/MergeVersions",{Ids:selection.join(",")})}).then(function(){loading.hide(),hideSelections(),dispatchNeedsRefresh()}))}function showSelections(initialCard){require(["emby-checkbox"],function(){for(var cards=document.querySelectorAll(".card"),i=0,length=cards.length;i<length;i++)showSelection(cards[i],initialCard===cards[i]);showSelectionCommands(),updateItemSelection(initialCard,!0)})}function onContainerClick(e){var target=e.target;if(selectedItems.length){var card=dom.parentWithClass(target,"card");if(card){var itemSelectionPanel=card.querySelector(".itemSelectionPanel");if(itemSelectionPanel)return onItemSelectionPanelClick(e,itemSelectionPanel)}return e.preventDefault(),e.stopPropagation(),!1}}var currentSelectionCommandsPanel,selectedItems=[],selectedElements=[];return document.addEventListener("viewbeforehide",hideSelections),function(options){function onTapHold(e){var card=dom.parentWithClass(e.target,"card");return card&&showSelections(card),e.preventDefault(),e.stopPropagation&&e.stopPropagation(),!1}function getTouches(e){return e.changedTouches||e.targetTouches||e.touches}function onTouchStart(e){var touch=getTouches(e)[0];if(touchTarget=null,touchStartX=0,touchStartY=0,touch){touchStartX=touch.clientX,touchStartY=touch.clientY;var element=touch.target;if(element){var card=dom.parentWithClass(element,"card");card&&(touchStartTimeout&&(clearTimeout(touchStartTimeout),touchStartTimeout=null),touchTarget=card,touchStartTimeout=setTimeout(onTouchStartTimerFired,550))}}}function onTouchMove(e){if(touchTarget){var deltaX,deltaY,touch=getTouches(e)[0];if(touch){var touchEndX=touch.clientX||0,touchEndY=touch.clientY||0;deltaX=Math.abs(touchEndX-(touchStartX||0)),deltaY=Math.abs(touchEndY-(touchStartY||0))}else deltaX=100,deltaY=100;(deltaX>=5||deltaY>=5)&&onMouseOut(e)}}function onTouchEnd(e){onMouseOut(e)}function onMouseDown(e){touchStartTimeout&&(clearTimeout(touchStartTimeout),touchStartTimeout=null),touchTarget=e.target,touchStartTimeout=setTimeout(onTouchStartTimerFired,550)}function onMouseOut(e){touchStartTimeout&&(clearTimeout(touchStartTimeout),touchStartTimeout=null),touchTarget=null}function onTouchStartTimerFired(){if(touchTarget){var card=dom.parentWithClass(touchTarget,"card");touchTarget=null,card&&showSelections(card)}}function initTapHold(element){browser.touch&&!browser.safari?element.addEventListener("contextmenu",onTapHold):(dom.addEventListener(element,"touchstart",onTouchStart,{passive:!0}),dom.addEventListener(element,"touchmove",onTouchMove,{passive:!0}),dom.addEventListener(element,"touchend",onTouchEnd,{passive:!0}),dom.addEventListener(element,"touchcancel",onTouchEnd,{passive:!0}),dom.addEventListener(element,"mousedown",onMouseDown,{passive:!0}),dom.addEventListener(element,"mouseleave",onMouseOut,{passive:!0}),dom.addEventListener(element,"mouseup",onMouseOut,{passive:!0}))}var touchTarget,touchStartTimeout,touchStartX,touchStartY,self=this,container=options.container;initTapHold(container),options.bindOnClick!==!1&&container.addEventListener("click",onContainerClick),self.onContainerClick=onContainerClick,self.destroy=function(){container.removeEventListener("click",onContainerClick),container.removeEventListener("contextmenu",onTapHold);var element=container;dom.removeEventListener(element,"touchstart",onTouchStart,{passive:!0}),dom.removeEventListener(element,"touchmove",onTouchMove,{passive:!0}),dom.removeEventListener(element,"touchend",onTouchEnd,{passive:!0}),dom.removeEventListener(element,"mousedown",onMouseDown,{passive:!0}),dom.removeEventListener(element,"mouseleave",onMouseOut,{passive:!0}),dom.removeEventListener(element,"mouseup",onMouseOut,{passive:!0})}}});