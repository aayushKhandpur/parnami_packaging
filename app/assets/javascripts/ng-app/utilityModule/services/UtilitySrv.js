utilityModule.service('utilitySrv', function () {

		var self = this;	
		this.LinkedList = function() {
			this._length = 0;
			this._head = null;
		}
		
		self.LinkedList.prototype = {
		
			add: function(data) {
			
				var node = {
					data: data,
					next: null
				};
				
				var current = {};

				//special case: no items in the list yet
				if (this._head === null){
					this._head = node;
				} else {
					current = this._head;

					while(current.next){
						current = current.next;
					}

					current.next = node;
				}

				//don't forget to update the count
				this._length++;
				
			},
			item: function(index){

				//check for out-of-bounds values
				if (index > -1 && index < this._length){
					var current = this._head,
						i = 0;

					while(i++ < index){
						current = current.next;
					}

					return current;
				} else {
					return null;
				}
			},
			remove: function(index){

				//check for out-of-bounds values
				if (index > -1 && index < this._length){

					var current = this._head,
						previous,
						i = 0;

					//special case: removing first item
					if (index === 0){
						this._head = current.next;
					} else {

						//find the right location
						while(i++ < index){
							previous = current;
							current = current.next;
						}

						//skip over the item to remove
						previous.next = current.next;
					}

					//decrement the length
					this._length--;

					//return the value
					return current.data;            

				} else {
					return null;
				}

			}
			
		
		}
		
		this.objLinkedList = new this.LinkedList();
		this.getLinkedObject = function() {
			return self.objLinkedList;
		}
		this.isLastUrl = function(url){
			if(url == self.objLinkedList.item(self.objLinkedList._length-1).data)
				return true;
			else 
				return false;
		}
		
		this.setLinkedObject = function(obj) {
			self.objLinkedList = obj;
		}
		

    });