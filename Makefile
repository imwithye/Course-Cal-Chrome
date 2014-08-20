all:
	bower install
	cake build
	cake zip

clean:
	cake clean
	rm -rf bower_components