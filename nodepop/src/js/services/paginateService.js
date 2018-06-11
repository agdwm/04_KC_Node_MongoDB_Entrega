'use strict';

const $ = require('jquery');

export default class PaginateService {
	constructor() {
		this.pageSize = 9;
		this.showGoInput = true;
		this.showGoButton = true;
		this.showBeginingOnOmit = false;
		this.showEndingOnOmit = false;
		this.pageRange = 1;
		this.prevText = '<i class="glyphicon glyphicon-chevron-left"></i>';
		this.nextText = '<i class="glyphicon glyphicon-chevron-right"></i>';
	}

	paginate(itemsLength, items, htmlContainer, self) {
		$('#pagination').pagination({
			dataSource: (done) => {
				const result = [];

				for (let i = 1; i < itemsLength; i += 1) {
					result.push(i);
				}
				done(result); // nº total number of elements
			},
			pageSize: this.pageSize, // nº elements per page
			showGoInput: this.showGoInput,
			showGoButton: this.showGoButton,
			showBeginingOnOmit: this.showBeginingOnOmit,
			showEndingOnOmit: this.showEndingOnOmit,
			pageRange: this.pageRange,
			prevText: this.prevText,
			nextText: this.nextText,
			callback: (data, pagination) => {
				const html = self.renderPaginatedPosts(data, items);
				$(htmlContainer).html(html);
			}
		})
	}
}